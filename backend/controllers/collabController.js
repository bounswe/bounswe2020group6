const {CollabRequest, ProjectCollaborator, User, Project}  = require('../model/db')
const {requestExists, getCollaborators} = require('../util/collabUtil')
const userUtils = require('../util/userUtil')
const {postExists} = require('../util/postUtil')
const {addNotification} = require('../util/notificationUtil')
const { Op } = require("sequelize");




/*
* this function takes request parameters from req object and calls certain functions to add request into database
* @param req : request
* @param res : response
*/
addRequest = async function(req, res){
    var requests = req.body.requests
    var requestError = "no error"
    var userError = "no error"
    alreadyRequestedUsers = []
    notFoundUsers = []
    try{
	for(var i = 0; i < requests.length; i++){
	    currentRequest = requests[i]
	    requesterId = currentRequest[0]
	    requestedId = currentRequest[1]
	    projectId = currentRequest[2]
	    requestType = currentRequest[3]
	    var userExistsDb = await userUtils.isUserExist(requestedId)			//checks if collaboration requested user exists
	    if(!userExistsDb){
	        notFoundUsers.push(requestedId)
	        userError = "Some users are not found"							//if not found puts it in notFoundUsers array 
            }else{
                var requestDb = await requestExists(requesterId, requestedId, projectId)		//checks if this request exists in database
		if(requestDb == undefined){
			//if everything is okay this creates new collaboration request
		    newReqDb = await CollabRequest.create({ requesterId : requesterId, requestedId : requestedId, projectId : projectId, requestType : requestType})
		}else{
		    alreadyRequestedUsers.push(requestDb)							//if request already exists in database puts it in array
		    requestError = "But, you requested collaboration from these users before:"
		}	
            }
	}
	res.status(201).send({message: "Available Collaborations are Requested",requestError : requestError ,alreadyRequestedUsers : alreadyRequestedUsers, userError : userError,notFoundUsers : notFoundUsers})
    }catch(error){
	res.status(500).send({error: error.message})
    }
}



/*
* this function deletes certain collaboration request from database
* @param req : request
* @param res : response
*/
deleteRequest = async function(req, res){
    var requestId
    try{
	if(req.params.id != undefined){
	    requestId = req.params.id
	}else{
	    requestId = req.requestId
	}
	await CollabRequest.destroy({
	    where : {
		id : requestId,
	    }
	});
	res.status(201).send({message: "Operation is Completed"})
    }catch(error){
	res.status(500).send({error: "ooop"})
    }
}



/*
* this function gets all requests along with request information thats sent to userId
* @param req : request
* @param res : response
*/
getRequest = async function(req,res){
    userId = req.userId
    try{
	requests = await CollabRequest.findAll({
	where : {
	    requestedId : userId
	},
	include : [
	    {
		model : User,
		attributes : ['name','surname'],
		required : false
	    },
	    {
		model : Project,
		attributes : ['title','summary','description','status'],
		required : false
	    }
	]
	});
	res.status(200).send(requests)
    }catch(error){
	res.status(500).send({error: error.message})
    }
}



/*
* this function basically adds collaborator to certain project
* @param req : request
* @param res : response
*/
addCollaborator = async function(req,res){
    try{
	projectId = req.body.projectId
	var postExistsDb = await postExists(projectId)					//checks if project exist
	if(postExistsDb){
	    collaboratorId = req.body.userId
	    request = await CollabRequest.findAll({						//finds collaboration request
		where : {
		    [Op.or] : [
		        {requestedId : collaboratorId},
			{requesterId : collaboratorId}
		    ],
		    projectId : projectId
		},
		attributes: ['id','requestedId','requesterId'],
		raw : true
	    });
	    if(request.length == 0){
		res.status(500).send({message : "Request is no longer available"})			//if request doesn't exist it gives error
	    }else{
		var body = "user " + request[0].requestedId + " accepted collaboration request concerning project " + projectId 	//body of notification
		await addNotification(projectId,0,request[0].requestedId,collaboratorId,request[0].requesterId,body)				//adds notification to be sent to requester
		//gets all collaborators of project and adds notifications to be sent to them about a user joining project
		project_collaborators = await getCollaborators(projectId)					
		collab_length = project_collaborators.length
		body = "user " + collaboratorId + " joined to project " + projectId
		for (i = 0; i < collab_length; i++) {
  		    await addNotification(projectId,1,collaboratorId,collaboratorId,project_collaborators[i].user_id,body)
		}
		collaboratorDb = await ProjectCollaborator.create({ project_id : projectId, user_id : collaboratorId})
		req.requestId = request[0].id
		deleteRequest(req,res);						//delete collaboration request from database concerning this collaboration
	    }
	}else{
	    res.status(500).send({message : "Project doesn't exist"})
	}
    }catch(error){
	res.status(500).send({error: error.message})
    }
}



/*
* this function deletes a collaborator from a project
* @param req : request
* @param res : response
*/
deleteCollaborator = async function(req,res){
    collaboratorId = req.params.collaboratorId
    projectId = req.params.projectId
    try{
	await ProjectCollaborator.destroy({
	    where : {
		project_id : projectId,
		user_id : collaboratorId
	    }
	});
	var body = "user " + collaboratorId + " removed from project " + projectId				//notification body
	//adds notifications to be sent to collaborators of project and deleted collaborator
	await addNotification(projectId,2,collaboratorId,collaboratorId,collaboratorId,body)	
	project_collaborators = await getCollaborators(projectId)
	collab_length = project_collaborators.length
	for (i = 0; i < collab_length; i++) {
  	    await addNotification(projectId,3,collaboratorId,collaboratorId,project_collaborators[i].user_id,body)
	}
	res.status(200).send({message: "Collaborator is Deleted"})
    }catch(error){
	res.status(500).send({error: error.message})
	console.log(error)
    }
}






module.exports = {
    addRequest,
    deleteRequest,
    getRequest,
    addCollaborator,
    deleteCollaborator
}

const {CollabRequest, ProjectCollaborator, User, Project}  = require('../model/db')
const {requestExists} = require('../util/collabUtil')
const userUtils = require('../util/userUtil')
const {postExists} = require('../util/postUtil')
const {addNotification} = require('../util/notificationUtil')
const { Op } = require("sequelize");



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
	    var userExistsDb = await userUtils.isUserExist(requestedId)
	    if(!userExistsDb){
	        notFoundUsers.push(requestedId)
	        userError = "Some users are not found"
            }else{
                var requestDb = await requestExists(requesterId, requestedId, projectId)
		if(requestDb == undefined){
		    newReqDb = await CollabRequest.create({ requesterId : requesterId, requestedId : requestedId, projectId : projectId, requestType : requestType})
		}else{
		    alreadyRequestedUsers.push(requestDb)
		    requestError = "But, you requested collaboration from these users before:"
		}	
            }
	}
	res.status(201).send({message: "Available Collaborations are Requested",requestError : requestError ,alreadyRequestedUsers : alreadyRequestedUsers, userError : userError,notFoundUsers : notFoundUsers})
    }catch(error){
	res.status(500).send({error: error.message})
    }
}



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



addCollaborator = async function(req,res){
    try{
	projectId = req.body.projectId
	var postExistsDb = await postExists(projectId)
	if(postExistsDb){
	    collaboratorId = req.body.userId
	    request = await CollabRequest.findAll({
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
		res.status(500).send({message : "Request is no longer available"})
	    }else{
		var body = "user " + request[0].requestedId + " accepted collaboration request concerning project " + projectId 
		await addNotification(projectId,0,request[0].requestedId,collaboratorId,request[0].requesterId,body)
		project_collaborators = await getCollaborators(projectId)
		collab_length = project_collaborators.length
		body = "user " + collaboratorId + " joined to project " + projectId
		for (i = 0; i < collab_length; i++) {
  		    await addNotification(projectId,1,collaboratorId,collaboratorId,project_collaborators[i].user_id,body)
		}
		collaboratorDb = await ProjectCollaborator.create({ project_id : projectId, user_id : collaboratorId})
		req.requestId = request[0].id
		deleteRequest(req,res);	
	    }
	}else{
	    res.status(500).send({message : "Project doesn't exist"})
	}
    }catch(error){
	res.status(500).send({error: error.message})
    }
}




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
	var body = "user " + collaboratorId + " removed from project " + projectId
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

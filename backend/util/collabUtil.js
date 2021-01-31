const {CollabRequest, User, ProjectCollaborator} = require("../model/db")

/*
* this function checks if a certain request exists in database. If it exists it returns that request else returns undefined
* @param requesterId : id of requester user
* @param requestedId : id of collaboration requested user
* @param projectId : id of project that collaboration requested for
*/
var requestExists = async function(requesterId,requestedId,projectId){
    requestDb = await CollabRequest.findOne({
	where : {
	    requesterId : requesterId,
	    requestedId : requestedId,
	    projectId : projectId
	},
	include : [
	    {
	        model : User,
		attributes : ['name','surname']
	    }
	]
    });
    if(requestDb){
	return requestDb
    }
    return undefined
}


/*
this function finds all collaborators of certain project and returns them.
* @param projectId : id of project
*/
var getCollaborators = async function(projectId){
    collaborators = ProjectCollaborator.findAll({
        where : {
            project_id : projectId
	},
	raw : true
    });
    return collaborators
}


module.exports = {
    requestExists,
    getCollaborators
}

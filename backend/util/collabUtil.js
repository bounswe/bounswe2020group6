const {CollabRequest, User, ProjectCollaborator} = require("../model/db")


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

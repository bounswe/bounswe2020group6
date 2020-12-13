const {CollabRequest, User} = require("../model/db")


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




module.exports = {
   requestExists
}

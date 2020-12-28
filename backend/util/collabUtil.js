const {CollabRequest, User} = require("../model/db")


var requestExists = async function(requesterId,requestedId,projectId,requestType){
    requestDb = await CollabRequest.findOne({
	where : {
	    requesterId : requesterId,
	    requestedId : requestedId,
	    projectId : projectId,
	    requestType : requestType
	},
	include : [
	    {
	        model : User,
		as : 'accepter',
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

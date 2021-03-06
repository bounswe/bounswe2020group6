const {User, Project, Notification}  = require('../model/db')
const {deleteRequest} = require('../controllers/collabController')
const {addNotification} = require('../util/notificationUtil')


/*
* this function is for adding rejection notification into database
* @param req : request
* @param res : response
*/
addRejectNotification = async function(req,res){
    try{
        rejecterId = req.userId
        projectId = req.body.projectId
        collaboratorId = req.body.rejectedId
        req.requestId = req.body.requestId
        body = "User " + rejecterId + " rejected collaboration request of user " + collaboratorId + " concerning project " + projectId 	//body of notification
        addNotification(projectId,-1,rejecterId,rejecterId,collaboratorId,body)
        deleteRequest(req,res)		//calls deleteRequest after a user rejects requester and this request is deleted from database
    }catch(error){
        res.status(500).send(error.message)
    }
}



/*
* this function deletes a certain notification from database
* @param req : request
* @param res : response
*/
deleteNotification = async function(req,res){
    try{
	id = req.params.id
	await Notification.destroy({
	    where : {
	        id : id
	    }
        });
	res.status(201).send({message: "Notification is deleted"})
    }catch(error){
	res.status(500).send(error.message)
    }
}


/*
* this function gets all notifications along with information about notification of a user who has id of userId
* @param req : request
* @param res : response
*/
getNotifications = async function(req,res){
    try{
        userId = req.userId
	notifications = await Notification.findAll({
            where : {
		receiverId : userId
	    },
            order: [['id', 'desc']],
            include : [
		{
                    model : User,
		    as : 'accepter',
		    attributes : ['name','surname'],
		    required : false
		},
		{
		    model : User,
		    as : 'participant',
		    attributes : ['id','name','surname'],
		    required : false
	        },
	        {
		    model : Project,
		    attributes : ['id','title','summary','description','status'],
		    required : false
	    	}
	    ]
        });
	res.status(200).send(notifications)
    }catch(error){
        res.status(500).send(error.message)
    }
}



module.exports = {
    deleteNotification,
    getNotifications,
    addRejectNotification
}

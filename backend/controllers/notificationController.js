const {User, Project, Notification}  = require('../model/db')

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


getNotifications = async function(req,res){
    try{
        userId = req.userId
	notifications = await Notification.findAll({
            where : {
		receiverId : userId
	    },
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
    getNotifications
}

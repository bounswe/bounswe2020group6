const {Notification} = require("../model/db")

var addNotification = async function(projectId,type,accepterId,participantId,receiverId,body){
	notification = {
	    projectId : projectId,
		  type : type,
		  accepterId : accepterId,
		  participantId : participantId,
		  receiverId : receiverId,
		  body : body
  }
	notificationDb = await Notification.create(notification)
}


module.exports = {
   addNotification
}

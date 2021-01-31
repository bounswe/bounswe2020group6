const {Notification} = require("../model/db")

/*
* this function adds notification to database
* @param projectId : id of project
* @param type : type of notification, is it acceptance, rejection or collaboration info to others etc.
* @param accepterId : id of user that accepts collaboration
* @param participantId : id of user that participatided in project
* @param receiverId : id of user who will receive this notification
* @param body : explains what notification is about
*/
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

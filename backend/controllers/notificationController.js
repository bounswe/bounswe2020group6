const { User, Notification, sequelize } = require('../model/db');

addNotification = async function (req, res) {
    
    notification={
        userId : req.body.userId,
        type : req.body.type,
        isRead : req.body.isRead,
        title : req.body.title,
        body : req.body.body,
        link : req.body.link,
        other : req.body.other,
    }

    try {
        addedNotification = await Notification.create(notification)
        
        res.status(200).send({message: "Event is created", notification: addedNotification})
        
    } catch (error) {
        res.status(500).send(error.message)
    }

}


getNotifications = async function (req, res) {
    console.log("getNotifications frame")
    try {
        notifications = await Notification.findAll()
        res.status(200).send({result: notifications})
    } catch (error) {
        res.status(500).send(error.message)
    }
}



module.exports = {
    addNotification,
    getNotifications,
}
const { User, Tag , Notification } = require('../model/db');


const express = require('express')
const router = express.Router()
const notificationController = require('../controllers/notificationController')


router.post('/addNotification', notificationController.addNotification)

router.get('/getNotifications', notificationController.getNotifications)

module.exports = router
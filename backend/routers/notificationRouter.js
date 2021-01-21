const express = require('express')
const router = express.Router()
const notificationController = require('../controllers/notificationController')

router.delete('/delete/:id', notificationController.deleteNotification)
router.get('/get', notificationController.getNotifications)

module.exports = router

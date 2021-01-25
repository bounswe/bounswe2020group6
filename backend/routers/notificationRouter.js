const express = require('express')
const router = express.Router()
const notificationController = require('../controllers/notificationController')

router.delete('/delete/:id', notificationController.deleteNotification)
router.get('/get', notificationController.getNotifications)
router.post('/add_rejection', notificationController.addRejectNotification)

module.exports = router

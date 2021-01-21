const express = require('express')
const router = express.Router()
const eventController = require('../controllers/eventController')


router.post('/add', eventController.addEvent)
router.get('/all', eventController.getEvents)
router.get('/event/:id', eventController.getEvent)
router.get('/search', eventController.searchEvents)
router.get('/update/:id', eventController.updateEvent)

module.exports = router
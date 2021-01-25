const express = require('express')
const router = express.Router()
const eventController = require('../controllers/eventController')


router.post('/add', eventController.addEvent)
router.get('/all', eventController.getEvents)
router.get('/event/:id', eventController.getEvent)
router.post('/search', eventController.searchEvents)
router.patch('/update/:id', eventController.updateEvent)
router.post('/fav', eventController.favEvent)
router.post('/unfav', eventController.unfavEvent)
router.post('/delete', eventController.deleteEvent)
router.get('/favorites', eventController.listFavEvents)

module.exports = router

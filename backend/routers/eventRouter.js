const express = require('express')
const router = express.Router()
const eventController = require('../controllers/eventController')


router.post('/add', eventController.addEvent) // add event route
router.get('/all', eventController.getEvents) // get all events route
router.get('/event/:id', eventController.getEvent) // get a specific event route
router.post('/search', eventController.searchEvents) // filter events route
router.patch('/update/:id', eventController.updateEvent) // update a specific event route
router.post('/fav', eventController.favEvent) //favorite an event route
router.post('/unfav', eventController.unfavEvent) //unfavorite an event route
router.post('/delete', eventController.deleteEvent) //delete an event route
router.get('/favorites', eventController.listFavEvents) //get favorited events of a user route

module.exports = router

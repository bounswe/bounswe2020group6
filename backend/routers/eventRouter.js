const { User, Tag , Event } = require('../model/db');


const express = require('express')
const router = express.Router()
const eventController = require('../controllers/eventController')


router.post('/addEvent', eventController.addEvent)

router.get('/getEvents', eventController.getEvents)

module.exports = router
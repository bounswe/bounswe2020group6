const express = require('express')
const router = express.Router()
const validateController = require('../controllers/validateController')

// route /validate/* endpoints to the relevant functions.
router.post('/', validateController.validate)
router.post('/fpassword', validateController.passwordForgotten)
router.post('/npassword', validateController.passwordReset)

module.exports = router
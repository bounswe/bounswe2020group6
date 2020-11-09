const express = require('express')
const router = express.Router()
const loginController = require('../controllers/loginController')

router.get('/zoo',loginController.signin)

module.exports = router
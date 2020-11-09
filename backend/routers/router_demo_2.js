const express = require('express')
const router = express.Router()
const loginController = require('../controllers/loginController')

router.get('/zoo',loginController.login)

module.exports = router
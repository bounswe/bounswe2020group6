const express = require('express')
const router = express.Router()
const loginController = require('../controllers/loginController')
const registerController = require('../controllers/registerController')

router.post('/',registerController.signup)

module.exports = router
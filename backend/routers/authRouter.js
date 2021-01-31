const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')


router.post('/login',authController.login) /** login route */
router.post('/signup',authController.signup) /** signup route */
router.post('/jwt', authController.jwtValidation) /** route that checks if a given token is valid */
router.post('/forgot', authController.forgotPassword) /** request password recovery email route */
/** route that checks whether entered code is 
correct for password recovery */
router.post('/code', authController.checkCode) 

module.exports = router
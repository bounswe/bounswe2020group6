const express = require('express')
const router = express.Router()
const validateController = require('../controllers/validateController')

router.post('/',validateController.validate)

module.exports = router
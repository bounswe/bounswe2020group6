const express = require('express')
const router = express.Router()
const profileController = require('../controllers/profileController')

router.post('/update', profileController.addProfile)
router.patch('/update', profileController.updateProfile)
router.get('/:userId', profileController.getProfile)

module.exports = router
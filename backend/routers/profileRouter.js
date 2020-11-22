const express = require('express')
const router = express.Router()
const profileController = require('../controllers/profileController')

router.post('/change', profileController.addProfile)
router.put('/change', profileController.updateProfile)
router.get('/change', profileController.getProfile)

module.exports = router
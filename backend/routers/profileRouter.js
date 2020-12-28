const express = require('express')
const router = express.Router()
const profileController = require('../controllers/profileController')

router.post('/update', profileController.addProfile)
router.patch('/update', profileController.updateProfile)
router.get('/:userId', profileController.getProfile)
router.post('/biography', profileController.changeBio)
router.post('/avatar', profileController.changeProfilePicture)
router.post('/googlescholar', profileController.addScholar)
router.post('/up', profileController.addUp)
router.post('/disup', profileController.removeUp)

module.exports = router
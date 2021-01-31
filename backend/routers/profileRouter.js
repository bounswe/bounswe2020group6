const express = require('express')
const router = express.Router()
const profileController = require('../controllers/profileController')

router.post('/update', profileController.addProfile) //create the profile route
router.patch('/update', profileController.updateProfile) //update the profile route
router.get('/:userId', profileController.getProfile) //get a user's profile route
router.post('/biography', profileController.changeBio) //change only biography of a user
router.post('/avatar', profileController.changeProfilePicture) //upload a profile picture for the user
router.post('/googlescholar', profileController.addScholar) //link account with google scholar
router.post('/up', profileController.addUp) //upvote a user
router.post('/disup', profileController.removeUp) //unupvote a user

module.exports = router
const express = require('express')
const router = express.Router()
const homeController = require('../controllers/homeController')

// route /home/* endpoints to the relevant functions.
router.get('/posts', homeController.getHomePosts)
router.get('/users', homeController.getUserRecommendations)
router.post('/delete', homeController.deleteAccount)


module.exports = router

const express = require('express')
const router = express.Router()
const homeController = require('../controllers/homeController')

router.get('/posts', homeController.getHomePosts)
router.get('/users', homeController.getUserRecommendations)


module.exports = router

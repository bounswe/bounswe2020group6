const express = require('express')
const router = express.Router()
const followController = require("../controllers/followController")

router.post('/add', followController.addFollow)
router.post('/remove', followController.removeFollow)
router.get('/followings', followController.getFollowings)
router.get('/followers', followController.getFollowers)

module.exports = router
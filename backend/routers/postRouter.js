const express = require('express')
const router = express.Router()
const postController = require('../controllers/postController')


router.post('/add',postController.upload.any(),postController.addPost)
router.post('/update', postController.updatePost)
router.post('/delete', postController.deletePost)
router.post('/get', postController.getPosts)

module.exports = router

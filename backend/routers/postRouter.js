const express = require('express')
const router = express.Router()
const postController = require('../controllers/postController')

//routes for adding,updating,deleting and getting posts. '/add' route also handles file uploads
router.post('/add',postController.upload.any(),postController.addPost)
router.post('/update', postController.updatePost)
router.post('/delete', postController.deletePost)
router.post('/get', postController.getPosts)

module.exports = router

const express = require('express')
const router = express.Router()
const postController = require('../controllers/postController')

//routes for adding,updating,deleting and getting posts. '/add' route also handles file uploads
router.post('/add',postController.upload.any(),postController.addPost)
router.patch('/update/:id', postController.updatePost)
router.delete('/delete/:id', postController.deletePost)
router.get('/get/:userId', postController.getPosts)


module.exports = router

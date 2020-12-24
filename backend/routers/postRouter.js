const express = require('express')
const router = express.Router()
const postController = require('../controllers/postController')
const fileController = require('../controllers/fileController')

//routes for adding,updating,deleting and getting posts. '/add' route also handles file uploads
router.post('/add',fileController.upload.any(),postController.addPost)
router.post('/add_tag',postController.addTag)
router.post('/add_milestone',postController.addMilestone)
router.patch('/update/:id', postController.updatePost)
router.patch('/update_milestone/:id', postController.updateMilestone)
router.delete('/delete/:id', postController.deletePost)
router.delete('/delete_tag/',postController.deleteTag)
router.delete('/delete_milestone/:id', postController.deleteMilestone)
router.get('/get/:id/:type', postController.getPosts)


module.exports = router

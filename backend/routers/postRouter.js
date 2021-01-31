const express = require('express')
const router = express.Router()
const postController = require('../controllers/postController')
const fileController = require('../controllers/fileController')


router.post('/add',fileController.upload.any(),postController.addPost)			//router for adding projects
router.post('/add_tag',postController.addTag)									//router for addding project tags
router.post('/add_milestone',postController.addMilestone)						//router for adding project milestones
router.patch('/update/:id', postController.updatePost)							//router for updating projects
router.patch('/update_milestone/:id', postController.updateMilestone)			//router for updating milestones
router.delete('/delete/:id', postController.deletePost)							//router for deleting projects
router.delete('/delete_tag/',postController.deleteTag)							//router for deleting project tags
router.delete('/delete_milestone/:id', postController.deleteMilestone)			//router for deleting project milestones
router.get('/get/:id/:type', postController.getPosts)							//router for getting projects from database, id is userId or projectId. type is 0 or 1. 0 denotes getting project with project id 1 denotes getting with userId(certain users project)


module.exports = router

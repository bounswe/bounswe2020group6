const express = require('express')
const router = express.Router()
const collabController = require('../controllers/collabController')



router.post('/add_request', collabController.addRequest)
router.post('/add_collaborator', collabController.addCollaborator)
router.get('/get_requests',collabController.getRequest)
router.delete('/delete_request/:id', collabController.deleteRequest)
router.delete('/delete_collaborator/:projectId/:collaboratorId', collabController.deleteCollaborator)


module.exports = router

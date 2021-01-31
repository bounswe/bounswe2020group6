const express = require('express')
const router = express.Router()
const collabController = require('../controllers/collabController')



router.post('/add_request', collabController.addRequest)           		//router for adding request
router.post('/add_collaborator', collabController.addCollaborator) 		//router for adding collaborator
router.get('/get_requests',collabController.getRequest)			   		//router for getting requests
router.delete('/delete_request/:id', collabController.deleteRequest) 	// router for deleting requests, id is id of request
router.delete('/delete_collaborator/:projectId/:collaboratorId', collabController.deleteCollaborator) 		//router for deleting collaborator					


module.exports = router

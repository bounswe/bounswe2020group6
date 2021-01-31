const express = require('express')
const router = express.Router()
const fileController = require('../controllers/fileController')


router.get('/get/:projectId/:fileName',fileController.getFile)				//router for getting file from database
router.post('/add',fileController.upload.any(),fileController.addFile)		//router for adding file into database
router.delete('/delete/:projectId/:filename', fileController.deleteFile)	//router for deleting file from database




module.exports = router

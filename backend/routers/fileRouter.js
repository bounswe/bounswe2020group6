const express = require('express')
const router = express.Router()
const fileController = require('../controllers/fileController')


router.get('/get/:projectId/:fileName',fileController.getFile)
router.post('/add',fileController.upload.any(),fileController.addFile)
router.delete('/delete/:projectId/:filename', fileController.deleteFile)




module.exports = router

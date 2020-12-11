const { User, UserInterest, UserAffiliation } = require('../model/db');


const express = require('express')
const router = express.Router()
const autoCompleteController = require('../controllers/autoCompleteController')

router.get('/getTitles', autoCompleteController.getTitles)
router.get('/getDepartments', autoCompleteController.getDepartments)
router.get('/getTags', autoCompleteController.getTags)
router.get('/getUniversities', autoCompleteController.getUniversities)
router.get('/getInterests', autoCompleteController.getInterests)

module.exports = router
const express = require('express')
const router = express.Router()
const searchController = require("../controllers/searchController")

// route /search/* endpoints to the relevant functions.
router.get("/", searchController.search)

module.exports = router
//contact route module
const express = require("express")
const router = express.Router()
const contact = require('../controllers/contactcontroller.js')
router.get('/Contact',contact)

module.exports = router
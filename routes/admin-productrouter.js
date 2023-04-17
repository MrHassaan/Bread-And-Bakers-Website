//admin product route module
const express = require("express")
const router = express.Router()
const product = require('../controllers/admin-productcontroller.js')
router.get('/Product',product)

module.exports = router
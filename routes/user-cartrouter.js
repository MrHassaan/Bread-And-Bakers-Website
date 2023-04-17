//user cart route module
const express = require("express")
const router = express.Router()
const cart = require('../controllers/user-cartcontroller.js')
router.get('/Cart',cart)

module.exports = router
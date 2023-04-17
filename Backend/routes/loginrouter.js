//login route module
const express = require("express")
const router = express.Router()
const login = require('../controllers/logincontroller.js')
router.get('/Login',login)

module.exports = router
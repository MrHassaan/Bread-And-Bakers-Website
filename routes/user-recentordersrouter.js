//recentorders route module
const express = require("express")
const router = express.Router()
const recentorders = require('../controllers/user-recentorderscontroller.js')
router.get('/RecentOrders',recentorders)

module.exports = router
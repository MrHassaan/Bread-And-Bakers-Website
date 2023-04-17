const express = require('express')
const router = express.Router()
const adminUpdateProductController = require('../controllers/adminUpdateProductController')

router.get('/UpdateProduct', adminUpdateProductController)

module.exports = router

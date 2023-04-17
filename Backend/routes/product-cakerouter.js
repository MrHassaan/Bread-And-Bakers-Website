//product_cake route module
const express = require("express")
const router = express.Router()
const product_cake = require('../controllers/product-cakecontroller.js')
router.get('/Cakes',product_cake)

module.exports = router
//admin addproduct route module
const express = require("express")
const router = express.Router()
const add_product = require('../controllers/admin-addproductcontroller.js')
router.get('/AddProduct',add_product)

module.exports = router
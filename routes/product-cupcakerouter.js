//product_cupcake route module
const express = require("express")
const router = express.Router()
const product_cupcake = require('../controllers/product-cupcakecontroller.js')
router.get('/Cupcakes',product_cupcake)

module.exports = router
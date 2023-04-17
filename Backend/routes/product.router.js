const product = require("../controllers/product.controller.js");

var router = require("express").Router();

// Create a new Product
router.post("/", product.create);

// Retrieve all Products
router.get("/", product.findAll);
router.get("/filter", product.findByPrice);
// Retrieve a single Product with id
router.get("/:id", product.findOne);

// Update a Product with id
router.put("/:id", product.update);

// Delete a Product with id
router.delete("/:id", product.delete);

// Delete all Products
router.delete("/", product.deleteAll);

module.exports = router;

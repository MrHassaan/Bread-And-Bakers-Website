const order = require("../controllers/order.controller.js");

var router = require("express").Router();

// Create a new order
router.post("/", order.create);

// Retrieve all orders
router.get("/", order.findAll);

// Retrieve a single order with id
router.get("/:id", order.findOne);

// Update a order with id
router.put("/:id", order.update);

// Delete a order with id
router.delete("/:id", order.delete);

// Delete all orders
router.delete("/", order.deleteAll);

module.exports = router;

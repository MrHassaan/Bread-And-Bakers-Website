const Delivery = require("../controllers/Delivery.controller.js");

var router = require("express").Router();

// Create a new Delivery
router.post("/", Delivery.create);

// Retrieve all Deliverys
router.get("/", Delivery.findAll);

// Retrieve a single Delivery with id
router.get("/:id", Delivery.findOne);

// Update a Delivery with id
router.put("/:id", Delivery.update);

// Delete a Delivery with id
router.delete("/:id", Delivery.delete);

// Delete all Deliverys
router.delete("/", Delivery.deleteAll);

module.exports = router;

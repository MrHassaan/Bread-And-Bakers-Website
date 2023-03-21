//contact route module
const express = require("express");
const router = express.Router();
const Deliver = require("../controllers/user-orderDeliverycontroller");
router.get("/OrderDelivery", Deliver);

module.exports = router;

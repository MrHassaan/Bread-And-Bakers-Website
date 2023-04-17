//About route module
const express = require("express");
const router = express.Router();
const About = require("../controllers/AboutController");
router.get("/About", About);

module.exports = router;

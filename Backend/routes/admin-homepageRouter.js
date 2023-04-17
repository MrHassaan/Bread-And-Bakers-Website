//Admin homePage route module
const express = require("express");
const router = express.Router();
const homePage = require("../controllers/admin-homePageController");
router.get("/", homePage);

module.exports = router;

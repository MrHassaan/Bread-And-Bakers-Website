//SignUp  route module
const express = require("express");
const router = express.Router();
const SignUp = require("../controllers/SignUpcontroller");
router.get("/SignUp", SignUp);

module.exports = router;

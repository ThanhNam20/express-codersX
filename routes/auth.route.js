var express = require('express');
var router = express.Router();
var authController = require("../controller/auth.controller.js");

router.get("/login",authController.login);

module.exports = router;
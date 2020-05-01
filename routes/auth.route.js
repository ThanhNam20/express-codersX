var express = require('express');
var router = express.Router();
var authController = require("../controller/auth.controller.js");

router.get('/register',authController.register);
router.post('/register',authController.saveRegister);
router.get("/login",authController.login);
router.post("/login",authController.postLogin);

module.exports = router;
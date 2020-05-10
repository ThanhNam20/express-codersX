var express = require("express");
var router = express.Router();

var cartController = require("../controller/cart.controller.js");

router.get('/',cartController.newTrans);

module.exports = router;
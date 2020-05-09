var express = require('express');
var router = express.Router();

var cartController = require('../controller/cart.controller.js');

router.get('/add/:productId',cartController.addToCart)

module.exports = router;
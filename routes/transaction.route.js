var express = require('express');
var router = express.Router();

var transactionController = require('../controller/transaction.controller');

router.get("/",transactionController.index)

router.get("/create",transactionController.create)

router.post("/create",transactionController.postCreate)



module.exports = router;
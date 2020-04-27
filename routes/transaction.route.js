var express = require('express');
var router = express.Router();

var transactionController = require('../controller/transaction.controller');

router.get("/",transactionController.index)

router.get("/create",transactionController.create)

router.post("/create",transactionController.postCreate)

router.get("/:id/detele",transactionController.isComplete)

module.exports = router;
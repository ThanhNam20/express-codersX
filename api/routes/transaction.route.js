var express = require("express");
var router = express.Router();

var transactionController = require("../../api/controllers/transaction.controller");

router.get("/", transactionController.index);

router.get("/create", transactionController.create);

router.post("/create", transactionController.postCreate);

router.get("/:id/isComplete", transactionController.isComplete);

module.exports = router;

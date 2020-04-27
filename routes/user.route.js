var express = require('express');
var router = express.Router();

var userController = require('../controller/user.controller.js')

router.get("/",userController.index)

router.get("/create",userController.create)

router.get("/:id",userController.detele)

router.get("/:id/rename",userController.rename)

router.post("/:id/rename",userController.postRename)

router.post("/create",userController.postCreate)

module.exports = router;
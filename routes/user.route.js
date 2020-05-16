var express = require('express');
var router = express.Router();
var multer = require('multer'); 

var upload = multer({ dest: './public/' })

var userController = require('../controller/user.controller.js')

router.get("/",userController.index)

// router.get("/create",userController.create)

router.get("/:id",userController.detele)

router.get("/:id/rename",userController.rename)

router.post("/:id/rename", upload.single('avatar'),userController.postRename)

// router.post("/create",userController.postCreate)

module.exports = router;
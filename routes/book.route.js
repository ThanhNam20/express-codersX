var express = require("express");
var router = express.Router();

var bookController = require("../controller/book.controller.js");

router.get("/", bookController.index);

router.get("/create", bookController.create);

// Xóa phần tử
router.get("/:id", bookController.detele);

// Thiết lập biến bookid cho trang rename
router.get("/:id/rename", bookController.rename);

// Đổi tên cho phần tử
router.post("/:id/rename", bookController.postRename);

//Thêm phần tử
router.post("/", bookController.add);
//Add to cart
router.get("/:id/add", bookController.addToCart);

router.get('/newTrans',bookController.newTrans);

module.exports = router;

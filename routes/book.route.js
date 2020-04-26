var express = require('express');
var router = express.Router();

var db = require("../db");  

const shortid = require("shortid");

router.get("/", (req, res) => {
  res.render("books");
});

// Xóa phần tử 
router.get("/:id",(req,res)=>{
  var id = req.params.id
  db.get("books").remove({id: id}).write();
  res.redirect('/')
})

// Thiết lập biến bookid cho trang rename
router.get("/:id/rename",(req,res)=>{
  var bookId = req.params.id
  res.render('rename', {bookId}); // render ra biến bookid truyền vào trang rename
})

// Đổi tên cho phần tử 
router.post("/:id/rename",(req,res)=>{
  var id = req.params.id
  var title = req.body.title
  db.get('books')
  .find({ id: id })
  .assign({ title: title})
  .write()
  res.redirect("/")
})

//Thêm phần tử
router.post("/", (req, res) => {
  req.body.id = shortid.generate();
  db.get("books")
    .push(req.body)
    .write();
  res.redirect("/");
});

module.export = router;
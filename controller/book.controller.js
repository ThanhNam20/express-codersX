var db = require("../db");  
const shortid = require("shortid");

module.exports.index = (req,res)=>{
  res.render('books',{
    books : db.get('books').value()
  });
}

module.exports.create = (req,res)=>{
  res.render('books/create');
}

module.exports.detele = (req,res)=>{
  var id = req.params.id
  db.get("books").remove({id: id}).write();
  res.redirect('/books')
}

module.exports.rename = (req,res)=>{
  var bookId = req.params.id
  res.render('books/rename', {bookId}); // render ra biến bookid truyền vào trang rename
}

module.exports.postRename = (req,res)=>{
  var id = req.params.id
  var title = req.body.title
  db.get('books')
  .find({ id: id })
  .assign({ title: title})
  .write()
  res.redirect("/books")
}

module.exports.add = (req, res) => {
  req.body.id = shortid.generate();
  db.get("books")
    .push(req.body)
    .write();
  res.redirect("/books");
}
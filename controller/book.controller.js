var db = require("../db");  
const shortid = require("shortid");

module.exports.index = (req,res)=>{
  var page = parseInt(req.query.page) || 1;
  var perPage = 10;
  var numberPage = Math.ceil(db.get('books').value().length / perPage );
  
  var start = (page - 1) * perPage;
  var end = page * perPage;
  res.render('books',{
    books: db.get('books').value().slice(start, end),
    numberPage: numberPage,
    page: page
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
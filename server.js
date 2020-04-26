const express = require("express");
const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const shortid = require("shortid");

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);

db.defaults({ books: [] }).write();

app.set("view engine", "pug");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("index", {
    books: db.get("books").value()
  });
});

app.get("/books", (req, res) => {
  res.render("books");
});

// Xóa phần tử 
app.get("/books/:id",(req,res)=>{
  var id = req.params.id
  db.get("books").remove({id: id}).write();
  res.redirect('/')
})

// Thiết lập biến bookid cho trang rename
app.get("/books/:id/rename",(req,res)=>{
  var bookId = req.params.id
  res.render('rename', {bookId}); // render ra biến bookid truyền vào trang rename
})

// Đổi tên cho phần tử 
app.post("/books/:id/rename",(req,res)=>{
  var id = req.params.id
  var title = req.body.title
  db.get('books')
  .find({ id: id })
  .assign({ title: title})
  .write()
  res.redirect("/")
})

//Thêm phần tử
app.post("/books", (req, res) => {
  req.body.id = shortid.generate();
  db.get("books")
    .push(req.body)
    .write();
  res.redirect("/");
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

const express = require("express");
const app = express();

var db = require("./db");

var bookRoute = require('./routes/book.route.js');

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const shortid = require("shortid");


app.set("view engine", "pug");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("index", {
    books: db.get("books").value()
  });
});



app.get("/users",(req,res)=>{
  res.render('users',{
    users: db.get("users").value()
  });
})

app.get("/users/create",(req,res)=>{
  res.render('createUser');
})

app.get("/users/:id",(req,res)=>{
  var id = req.params.id;
  db.get("users").remove({id:id}).write();
  res.redirect('/users')
})

app.get("/users/:id/rename",(req,res)=>{
  var userId = req.params.id
  res.render('rename-User',{userId})
})

app.post("/users/:id/rename",(req,res)=>{
  var id = req.params.id;
  var name = req.body.name;
  db.get('users').find({id:id}).assign({ name: name})
  .write();
  res.redirect("/users")
})

app.post("/users/create",(req,res)=>{
  req.body.id = shortid.generate();
  db.get("users")
    .push(req.body)
    .write();
  res.redirect("/users");
})

app.use('/books',bookRoute);

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

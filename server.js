const express = require("express");
const app = express();

var db = require("./db");

var bookRoute = require('./routes/book.route.js');
var userRoute = require('./routes/user.route.js');

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const shortid = require("shortid");

app.set("view engine", "pug");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("books/index", {
    books: db.get("books").value()
  });
});


app.get("/transactions",(req,res)=>{
  res.render("transactions/index",{
    transactions: db.get("transactions").value()
  });
})

app.get("/transactions/create",(req,res)=>{
  res.render("transactions/create",{
    books: db.get('books').value(),
    users: db.get('users').value()
  })
})

app.post("tranactions/create",(req,res)=>{
  
})

app.use('/books',bookRoute);
app.use('/users',userRoute);

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

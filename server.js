const express = require("express");
const app = express();

var db = require("./db");

var bookRoute = require("./routes/book.route.js");
var userRoute = require("./routes/user.route.js");
var transactionRoute = require("./routes/transaction.route.js");

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

app.get('/cookies', (req, res, next) => {
    var count = 1;
    res.cookie('cookies', `${count++}`);
    res.send('Hello codersX');
    console.log(req.cookies);
})

app.use("/books", bookRoute);
app.use("/users", userRoute);
app.use("/transactions", transactionRoute);
app.use(express.static("public"));


// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});


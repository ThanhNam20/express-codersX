const express = require("express");
const app = express();

var db = require("./db");

var bookRoute = require("./routes/book.route.js");
var userRoute = require("./routes/user.route.js");
var transactionRoute = require("./routes/transaction.route.js");
var authRoute = require("./routes/auth.route.js");
var authMiddileware = require("./middleware/auth.middleware.js");
var adminMiddleware = require('./middleware/isAdmin.js')
var cookieParser = require('cookie-parser');

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser())

const shortid = require("shortid");

app.set("view engine", "pug");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("index", {
    books: db.get("books").value()
  });
});

app.get('/cookies', (req, res, next) => {
    var count = 2;
    res.cookie('cookies', `${count++}`);
    res.send('Hello codersX');
    console.log(req.cookies);
})

app.use("/books",authMiddileware.requireAuth,adminMiddleware.isAdmin, bookRoute);
app.use("/users",authMiddileware.requireAuth,adminMiddleware.isAdmin, userRoute);
app.use("/transactions",authMiddileware.requireAuth,adminMiddleware.isAdmin, transactionRoute);
app.use('/auth', authRoute);
app.use(express.static("public"));


// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});


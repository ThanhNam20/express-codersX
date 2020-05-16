require("dotenv").config();
const express = require("express");
const app = express();
var shortid = require("shortid");
var db = require("./db");
var mongoose = require("mongoose");
var env = require('dotenv');
var port = 8080;
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });

var bookRoute = require("./routes/book.route.js");
var userRoute = require("./routes/user.route.js");
var transactionRoute = require("./routes/transaction.route.js");
var authRoute = require("./routes/auth.route.js");
var cartRoute = require("./routes/cart.route.js");
var apiAuthRoute = require("./api/routes/auth.route");
var apiBookRoute = require("./api/routes/book.route");
var apiTranRoute = require("./api/routes/transaction.route");

var authMiddileware = require("./middleware/auth.middleware.js");
var adminMiddleware = require("./middleware/isAdmin.middleware.js");
var sessionMiddleware = require("./middleware/session.middleware.js");

var cookieParser = require("cookie-parser");

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser("abcd123123"));
app.use(sessionMiddleware);

app.set("view engine", "pug");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("index", {
    books: db.get("books").value()
  });
});

app.get("/cookies", (req, res, next) => {
  var count = 2;
  res.cookie("cookies", `${count++}`);
  res.send("Hello codersX");
  console.log(req.cookies);
});

app.use("/books", bookRoute);
app.use("/users", authMiddileware.requireAuth, userRoute);
app.use("/transactions", authMiddileware.requireAuth, transactionRoute);
app.use("/auth", authRoute, adminMiddleware.isAdmin(true));
app.use("/cart", authMiddileware.requireAuth, cartRoute);
app.use("/api/auth", apiAuthRoute);
app.use("/api/books",apiBookRoute);
app.use("/api/transactions", apiTranRoute);
app.use(express.static("public"));
// listen for requests :)
const listener = app.listen(port,() => {
  console.log(`Example app listening at http://localhost:${port}`);
});

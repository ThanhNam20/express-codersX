const express = require("express");
const app = express();
var shortid = require("shortid");
var db = require("./db");


var bookRoute = require("./routes/book.route.js");
var userRoute = require("./routes/user.route.js");
var transactionRoute = require("./routes/transaction.route.js");
var authRoute = require("./routes/auth.route.js");
var authMiddileware = require("./middleware/auth.middleware.js");
var cookieParser = require("cookie-parser");

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser('abcd123123'));

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

//SENDGRID
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_KEY);
const msg = {
  to: 'thanhnam2462000@gmail.com',
  from: 'khuatthanhnam@gmail.com',
  subject: 'Sending with Twilio SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};

sgMail
  .send(msg)
  .then(() => {}, error => {
    console.error(error);
 
    if (error.response) {
      console.error(error.response.body)
    }
  });
  
app.use("/books", authMiddileware.requireAuth, bookRoute);
app.use("/users", authMiddileware.requireAuth, userRoute);
app.use("/transactions", authMiddileware.requireAuth, transactionRoute);
app.use("/auth", authRoute);
app.use(express.static("public"));

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

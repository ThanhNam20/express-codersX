const express = require("express");
const app = express();

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const shortid = require("shortid");

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);

db.defaults({ books: [] }).write();

app.set('view engine', 'pug');
app.set('views', './views');

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  
});

// send the default array of dreams to the webpage
app.get("/books", (req, res) => {
  
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

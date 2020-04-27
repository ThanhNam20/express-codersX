var express = require('express');
var router = express.Router();

var db = require("../db");  

const shortid = require("shortid");

router.get("/",(req,res)=>{
  res.render("transactions/index",{
    transactions: db.get("transactions").value()
  });
})

router.get("/create",(req,res)=>{
  res.render("transactions/create",{
    books: db.get('books').value(),
    users: db.get('users').value()
  })
})

router.post("/create",(req,res)=>{
  req.body.id = shortid.generate();
  db.get("transactions").push(req.body).write();
  res.redirect("/transactions");
})

module.exports = router;
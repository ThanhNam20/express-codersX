var express = require('express');
var router = express.Router();

var db = require("../db");  

const shortid = require("shortid");

router.get("/",(req,res)=>{
  res.render('users/index',{
    users: db.get("users").value()
  });
})

router.get("/create",(req,res)=>{
  res.render('users/createUser');
})

router.get("/:id",(req,res)=>{
  var id = req.params.id;
  db.get("users").remove({id:id}).write();
  res.redirect('/users')
})

router.get("/:id/rename",(req,res)=>{
  var userId = req.params.id
  res.render('users/rename',{userId})
})

router.post("/:id/rename",(req,res)=>{
  var id = req.params.id;
  var name = req.body.name;
  db.get('users').find({id:id}).assign({ name: name})
  .write();
  res.redirect("/users")
})

router.post("/create",(req,res)=>{
  req.body.id = shortid.generate();
  db.get("users")
    .push(req.body)
    .write();
  res.redirect("/users");
})

module.exports = router;
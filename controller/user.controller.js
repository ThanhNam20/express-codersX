var db = require("../db");  
const shortid = require("shortid");


module.exports.index = (req,res)=>{
  res.render('users/index',{
    users: db.get("users").value()
  });
}

module.exports.detele = (req,res)=>{
  var id = req.params.id;
  db.get("users").remove({id:id}).write();
  res.redirect('/users')
}

module.exports.create = (req,res)=>{
  res.render('users/createUser');
}

module.exports.rename = (req,res)=>{
  var userId = req.params.id
  res.render('users/rename',{userId})
}

module.exports.postRename = (req,res)=>{
  var id = req.params.id;
  var name = req.body.name;
  db.get('users').find({id:id}).assign({ name: name})
  .write();
  res.redirect("/users")
}

module.exports.postCreate = (req,res)=>{
  req.body.id = shortid.generate();
  var errors = [];
  if(!req.body.name ||req.body.name.length > 30)
    errors.push("Không để trống, Số kí tự không vượt quá 30 !")
  if(errors.length){
    res.render('users/createUser',{
      errors: errors
    })
    return;
  }
  db.get("users")
    .push(req.body)
    .write();
  res.redirect("/users");
}
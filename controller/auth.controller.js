var db = require("../db");
const shortid = require("shortid");
var md5= require("md5");
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.register = (req,res,next)=>{
  res.render('auth/register');
}

module.exports.saveRegister = (req,res,next)=>{
  bcrypt.hash(req.body.passwordsignup, saltRounds, function (err, hash) {
   db.User.create({
   name: req.body.name,
   email: req.body.email,
   password: hash
   }).then(function(data) {
    if (data) {
    res.redirect('/home');
    }
  });
 });
});
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
}


module.exports.login = (req,res)=>{
  res.render('auth/login');
}

module.exports.postLogin = (req,res)=>{
  var email = req.body.email;
  var password = req.body.password;
  var user = db.get('users').find({email:email}).value();
  if(!user){
    res.render('auth/login',{
      errors:[
        'User is not found!'
      ]
    });
  }
  var hashPassword = md5(password)
  if(user.password !== hashPassword){
    res.render("auth/login",{
      errors:[
        'wrong password!'
      ]
    });
    return;
  }
  res.cookie('userId',user.id);
  res.redirect('/');
}


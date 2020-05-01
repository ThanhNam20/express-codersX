var db = require("../db");
var md5= require("md5");
const bcrypt = require('bcrypt');




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


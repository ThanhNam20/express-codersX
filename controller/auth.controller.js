var db = require("../db");

module.exports.login = (req,res)=>{
  res.render('auth/login');
}
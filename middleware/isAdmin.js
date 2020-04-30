var db = require('../db');
module.exports.isAdmin = (req,res,next)=>{
  var user = db.get('users').find({ id: req.cookies.userId }).value();
  if(user.isAdmin === true){
      res.redirect('/transactions')
    }else{
      res.redirect('/');
    }
}
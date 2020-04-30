var db = require('../db');
module.exports.requireAuth = (req, res, next) => {
  console.lof(req.coo)
    if (!req.cookies.userId) {
        res.redirect('/auth/login');
        return;
    }
    var user = db.get('users').find({ id: req.cookies.userId }).value();
    if (!user) {
        res.redirect("/auth/login");
        return;
    };
    next();
}

module.exports.isAdmin = (req,res,next)=>{
  
}
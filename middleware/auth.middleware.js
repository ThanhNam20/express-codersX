var db = require('../db');
module.exports.requireAuth = (req, res, next) => {
    if (!req.cookies.userId) {
        res.redirect('/auth/login');
        return;
    }
    var user = db.get('users').find({ id: req.cookies.userId }).value();
    if (!user) {
        res.redirect("/auth/login");
        return;
    };
    if(user.isAdmin === true){
      res.redirect('')
    }else{
      res.locals.display = 'none';
    }
    next();
}


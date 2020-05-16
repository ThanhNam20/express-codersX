var db = require('../db');
var User = require('../models/user.model');
module.exports.requireAuth = (req, res, next) => {
    if (!req.signedCookies.userId) {
        res.redirect('/auth/login');
        return;
    }
    var user = User.findOne({ id: req.signedCookies.userId });
    if (!user) {
        res.redirect("/auth/login");
        return;
    };
  next();
}


var db = require('../db');
module.exports.isAdmin = (isAdmin) =>{
    return function (req, res, next){
        let user = db.get("users").find({id: req.signedCookies.userId}).value();
        if (user.isAdmin === isAdmin){
            res.redirect('/transactions');
            next();
        } else res.redirect('/books');
    }
}
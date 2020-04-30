var db = require('../db');
module.exports.isAdmin = (isAdmin) =>{
    return function (req, res, next){
        let user = db.get("users").find({id: req.cookies.userId1}).value();
        if (user.isAdmin === isAdmin){
            res.redirect('/transactions')
            next();
        } else res.redirect('/books');
    }
}
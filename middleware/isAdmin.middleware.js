var db = require('../db');
var User = require("../models/user.model");
module.exports.isAdmin = (isAdmin) =>{
    return async function (req, res, next){
        let users = await User.find();
        users.forEach(user => {
            if (user.isAdmin === isAdmin) {
              res.redirect("/transactions");
              next();
            } else res.redirect("/books");
        })
    }
}
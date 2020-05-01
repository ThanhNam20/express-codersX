var db = require("../db");
const shortid = require("shortid");
var md5 = require("md5");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports.register = (req, res, next) => {
  res.render("auth/register");
};

module.exports.saveRegister = (req, res, next) => {
  req.body.id = shortid.generate();
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    db.get("users").push({
      id: req.body.id, 
      name: req.body.name,
      email: req.body.email,
      password: hash,
      isAdmin: false
    }).write();
    res.redirect('/auth/login');
  });
};

module.exports.login = (req, res) => {
  res.render("auth/login");
};

module.exports.postLogin = (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  var user = db
    .get("users")
    .find({ email: email })
    .value();
  if (!user) {
    res.render("auth/login", {
      errors: ["User is not found!"]
    });
  }
  var hashPassword = md5(password);
  if (user.password !== hashPassword) {
    res.render("auth/login", {
      errors: ["wrong password!"]
    });
    return;
  }
  res.cookie("userId", user.id);
  res.redirect("/");
};

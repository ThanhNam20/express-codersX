var db = require("../db");
const shortid = require("shortid");
var User = require("../models/user.model");

module.exports.index = async(req, res) => {
  var users = await User.find();
  res.render('users/index', {
    users:users
  })
};

module.exports.detele = async(req, res) => {
  var id = req.params.id;
  await User.findByIdAndDelete(id);
  res.redirect("/users");
};

// module.exports.create = (req, res) => {
//   res.render("users/createUser");
// };

module.exports.rename = (req, res) => {
  var userId = req.params.id;
  res.render("users/rename", { userId });
};

module.exports.postRename = async(req, res) => {
  var id = req.params.id;
  var name = req.body.name;
  req.body.avatarUrl = req.file.path.split("\\").slice(1).join("\\");
  await User.findByIdAndUpdate(id, {  name:name , avatarUrl: req.body.avatarUrl });
  res.redirect("/users");
  await User.save();
};

// module.exports.postCreate = (req, res) => {
//   req.body.id = shortid.generate();
//   var errors = [];
//   if (!req.body.name || req.body.name.length > 30)
//     errors.push("Không để trống, Số kí tự không vượt quá 30 !");
//   if (errors.length) {
//     res.render("users/createUser", {
//       errors: errors
//     });
//     return;
//   }
//   db.get("users")
//     .push(req.body)
//     .write();
//   res.redirect("/users");
// };

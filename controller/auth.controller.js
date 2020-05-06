var db = require("../db");
const shortid = require("shortid");
var md5 = require("md5");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const sgMail = require("@sendgrid/mail");
module.exports.register = (req, res, next) => {
  res.render("auth/register");
};

module.exports.saveRegister = (req, res, next) => {
  req.body.id = shortid.generate();
  req.body.avatarUrl = `https://ui-avatars.com/api/?name=${user.name}`
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    db.get("users")
      .push({
        wrongLoginCount: 0,
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        password: hash,
        isAdmin: false
      })
      .write();
    res.redirect("/auth/login");
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
  } else {
    bcrypt.compare(req.body.password, user.password, function(err, result) {
      var wrongLoginCount = user.wrongLoginCount;
      if (result == false) {
        wrongLoginCount++;
        db.get("users")
          .find({ id: user.id })
          .assign({ wrongLoginCount: wrongLoginCount })
          .write();
        res.render("auth/login", {
          errors: ["Wrong password!"]
        });
        if (wrongLoginCount >= 3) {
          sgMail.setApiKey(process.env.SENDGRID_API_KEY);
          const msg = {
            to: user.email,
            from: "khuatthanhnam@gmail.com",
            subject: "Cảnh báo đăng nhập !! ",
            text:
              "Bạn đã nhập sai mật khẩu quá số lần quy định, tài khoản của bạn sẽ bị khóa 24h!!",
            html:
              "<strong>Bạn đã nhập sai mật khẩu quá số lần quy định, tài khoản của bạn sẽ bị khóa 24h!!</strong>"
          };
          //ES6
          sgMail.send(msg).then(
            () => {},
            error => {
              console.error(error);

              if (error.response) {
                console.error(error.response.body);
              }
            }
          );
        }
      } else {
        res.cookie("userId", user.id, {
          signed: true
        });
        res.redirect("/");
      }
    });
  }
};

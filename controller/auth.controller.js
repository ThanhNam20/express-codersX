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
  var wrongLoginCount = user.wrongLoginCount;
  if (!user) {
    res.render("auth/login", {
      errors: ["User is not found!"]
    });
  } else {
    bcrypt.compare(req.body.password, user.password, function(err, result) {
      if (result == false) {
        wrongLoginCount++;
        console.log(wrongLoginCount);
        db.get("users")
          .find({ id: user.id })
          .assign({ wrongLoginCount: wrongLoginCount })
          .write();
        res.render("auth/login", {
          errors: ["Wrong password!"]
        });
        if (wrongLoginCount >= 2) {
          sgMail.setApiKey(process.env.SENDGRID_API_KEY);
          const msg = {
            to: "thanhnam2462000@gmail.com",
            from: "khuatthanhnam@gmail.com",
            subject: "Sending with Twilio SendGrid is Fun",
            text: "and easy to do anywhere, even with Node.js",
            html: "<strong>and easy to do anywhere, even with Node.js</strong>"
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

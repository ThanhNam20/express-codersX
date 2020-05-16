var db = require("../db");
const shortid = require("shortid");
var md5 = require("md5");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const sgMail = require("@sendgrid/mail");

const User = require("../models/user.model");
module.exports.register = (req, res, next) => {
  res.render("auth/register");
};

module.exports.saveRegister = async (req, res, next) => {
  req.body.randomNum = Math.floor(Math.random() * 1000);
  bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
    const newUser = new User({
      wrongLoginCount: 0,
      name: req.body.name,
      email: req.body.email,
      password: hash,
      isAdmin: false,
      avatarUrl: "https://api.adorable.io/avatars/100",
    });
    res.redirect("/auth/login");
    await newUser.save();
  });
};

module.exports.login = (req, res) => {
  res.render("auth/login");
};

module.exports.postLogin = async (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  var user = await User.findOne({ email: email });
  if (!user) {
    res.render("auth/login", {
      errors: ["User is not found!"],
    });
  } else {
    bcrypt.compare(req.body.password, user.password, async function (
      err,
      result
    ) {
      var wrongLoginCount = user.wrongLoginCount;
      if (result == false) {
        wrongLoginCount++;
        await User.findByIdAndUpdate(user._id, {
          wrongLoginCount: wrongLoginCount,
        });

        res.render("auth/login", {
          errors: ["Wrong password!"],
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
              "<strong>Bạn đã nhập sai mật khẩu quá số lần quy định, tài khoản của bạn sẽ bị khóa 24h!!</strong>",
          };
          //ES6
          sgMail.send(msg).then(
            () => {},
            (error) => {
              console.error(error);

              if (error.response) {
                console.error(error.response.body);
              }
            }
          );
        }
      } else {
        res.cookie("userId", user._id, {
          signed: true,
        });
        res.redirect("/");
      }
    });
  }
};

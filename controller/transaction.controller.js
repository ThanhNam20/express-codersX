var db = require("../db");  
const shortid = require("shortid");
var Transaction = require("../models/transaction.model");
var Book = require("../models/book.model");
var User = require("../models/user.model");

module.exports.index = async (req, res)=> {
  var transactions = await Transaction.find();
  res.render("transactions/index",{
    transactions: transactions
  });
}

module.exports.create = async (req, res) => {
  var books = await Book.find();
  var users = await User.find();
  res.render("transactions/create",{
    books:books,
    users: users
  })
}

module.exports.postCreate = async(req,res)=>{
  req.body.isComplete = false;
  var trans = new Transaction(req.body);
  await trans.save();
  res.redirect("/transactions");
  res.send(trans);
}

module.exports.isComplete = async(req,res)=>{
  var id = req.params.id
  await Transaction.findByIdAndUpdate(id, { isComplete: true });
  res.redirect('/transactions')
  await Transaction.save();
}
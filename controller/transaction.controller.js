var db = require("../db");  
const shortid = require("shortid");

module.exports.index = (req,res)=>{
  res.render("transactions/index",{
    transactions: db.get("transactions").value()
  });
}

module.exports.create = (req,res)=>{
  res.render("transactions/create",{
    books: db.get('books').value(),
    users: db.get('users').value()
  })
}

module.exports.postCreate
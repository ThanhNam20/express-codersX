var db = require("../db");
const shortid = require("shortid");

module.exports.newTrans = (req,res,next)=>{
  var userId = req.signedCookies.userId;
  var sessionId = req.signedCookies.sessionId;
  var id = shortid.generate();
  var bookId = db.get('sessions').find({id:userId})
  db.get('transactions').push({
    id: id,
    userid: userId,
    isComplete: false,
    bookId : _.keys({bookId}),
  })
}
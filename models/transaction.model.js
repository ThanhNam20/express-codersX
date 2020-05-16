var mongoose = require("mongoose");
var transSchema = new mongoose.Schema({
    isComplete: Boolean,
    userId: String,
    bookId:String
})

var Transaction = mongoose.model("Transaction", transSchema, "transactions");
module.exports = Transaction;
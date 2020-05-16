
const shortid = require("shortid");
var Book = require("../../models/book.model");

module.exports.index = async (req, res) => {
  var books = await Book.find();
  res.json(books);
};

module.exports.detele = async (req, res) => {
  var id = req.params.id;
  await Book.findByIdAndDelete(id);
  res.redirect("/books");
};

module.exports.rename = (req, res) => {
  var bookId = req.params.id;
  res.render("books/rename", { bookId }); // render ra biến bookid truyền vào trang rename
};

module.exports.postRename = async (req, res) => {
  var id = req.params.id;
  await Book.findByIdAndUpdate(id, { title: req.body.title });
  res.redirect("/books");
  await Book.save();
};

module.exports.create = (req, res) => {
  res.render("books/create");
};

module.exports.add = async (req, res) => {
  const newBook = new Book(req.body);
  await newBook.save();
  res.redirect("/books");
  res.send(newBook);
};

module.exports.addToCart = (req, res, next) => {
  var bookId = req.params.id;
  var sessionId = req.signedCookies.sessionId;
  if (!sessionId) {
    res.redirect("/books");
    return;
  }
  var count = db
    .get("sessions")
    .find({ id: sessionId })
    .get("cart." + bookId, 0)
    .value();

  db.get("sessions")
    .find({
      id: sessionId,
    })
    .set("cart." + bookId, count + 1)
    .write();

  res.locals.bookId = bookId;
  res.redirect("/books");
};

const BookModel = require("../models/bookModel");

const createBook = async function (req, res) {
  let data = req.body;
  let savedData = await BookModel.create(data);
  res.send({ msg: savedData });
};
const bookList = async function (req, res) {
  let allBookslist = await BookModel.find().select({
    bookName: 1,
    authorName: 1,
    _id: 0,
  });
  res.send({ msg: allBookslist });
};

const getBooksInYear = async function (req, res) {
  let yearList = await BookModel.find({ year: req.body.year }).select({
    bookName: 1,
    _id: 0,
  });
  res.send(yearList);
};

const getPartucularBooks = async function (req, res) {
  let specificBooks = await BookModel.find(req, body);
  res.send({ msg: specificBooks });
};
const getXINRBooks = async function (req, res) {
  let priceList = await BookModel.find({
    "prices.indianPrice": { $in: ["100INR", "200INR", "500INR"] },
  }).select({ bookName: 1, _id: 0 });
  res.send({ msg: priceList });
};

const getRandomBooks = async function (req, res) {
  let randomNooks = await BookModel.find({
    $or: [{ stockAvailable: true }, { totalpages: { $gt: 50 } }],
  });
  res.send({ msg: randomNooks });
};

module.exports.createBook = createBook;
module.exports.bookList = bookList;
module.exports.getBooksInYear = getBooksInYear;
module.exports.getParticularBooks = getPartucularBooks;
module.exports.getXINRBooks = getXINRBooks;
module.exports.getRandomBooks = getRandomBooks;

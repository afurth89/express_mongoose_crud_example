var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/mongoBooks");

module.exports.Book = require("./book");
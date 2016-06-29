const express = require('express')
const mongoose = require('mongoose');
const app = express();


mongoose.connect('mongodb://localhost/mongoBooks');

var bookSchema = new mongoose.Schema({
                    title: String,
                    author: String
                  });

mongoose.model('books', bookSchema)

app.get('/books', (req, res) => {
  mongoose.model('books').find(function(err, books) {
    res.send(books);
  })
})

app.listen(3000, function() {
  console.log("Listening on port 3000...")
});

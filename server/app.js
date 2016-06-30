const express = require('express')
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));

mongoose.connect('mongodb://localhost/mongoBooks');

var bookSchema = new mongoose.Schema({
                    title: String,
                    author: String
                  });

mongoose.model('books', bookSchema)

app.get('/books', (req, res) => {
  mongoose.model('books').find(function(err, books) {
    res.render('index', {books: books});
  })
})

app.get('/books/new', (req, res) => {
  res.render('new')
})


app.post('/books', (req, res) => {
  mongoose.model('books').create({title: req.body.title, author: req.body.author}, function(err, book) {
    if (err) {
      console.log(err)
      res.redirect('/books/new')
    }
    else {
      console.log("NEW BOOK: ", book)
      res.redirect('/books')
    }
  })
})

app.get('*', (req, res) => {
  res.redirect('/books')
})


app.listen(3000, function() {
  console.log("Listening on port 3000...")
});

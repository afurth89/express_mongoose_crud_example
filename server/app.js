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

// INDEX
app.get('/books', (req, res) => {
  mongoose.model('books').find(function(err, books) {
    res.render('index', {books: books});
  })
})

// NEW
app.get('/books/new', (req, res) => {
  res.render('new')
})

// SHOW
app.get('/books/:id', (req, res) => {
  mongoose.model('books').findById(req.params.id, function(err, book) {
    res.render('show', {book:book})
  })
})


// EDIT
app.get('/books/:id/edit', (req, res) => {
  mongoose.model('books').findById(req.params.id, function(err, book) {
    res.render('edit', {book:book})
  })
})

// CREATE
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

// UPDATE
app.put('/books/:id', (req, res) => {
  mongoose.model('books')
    .findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      author: req.body.author
    }, function(err, book) {
      if (err) {
        console.log(err)
        res.render(edit)
      } 
      else {
        res.redirect('/books')
      }
    })
})

// DELETE


// CATCH-ALL
app.get('*', (req, res) => {
  res.redirect('/books')
})


app.listen(3000, function() {
  console.log("Listening on port 3000...")
});

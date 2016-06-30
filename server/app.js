const express = require('express')
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const db = require('./models')

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));

// INDEX
app.get('/books', (req, res) => {
  db.Book.find(function(err, books) {
    res.render('index', {books: books});
  })
})

// NEW
app.get('/books/new', (req, res) => {
  res.render('new')
})

// SHOW
app.get('/books/:id', (req, res) => {
  db.Book.findById(req.params.id, function(err, book) {
    res.render('show', {book:book})
  })
})


// EDIT
app.get('/books/:id/edit', (req, res) => {
  db.Book.findById(req.params.id, function(err, book) {
    res.render('edit', {book:book})
  })
})

// CREATE
app.post('/books', (req, res) => {
  db.Book.create({title: req.body.title, author: req.body.author}, function(err, book) {
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
  db.Book
    .findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      author: req.body.author
    }, function(err, book) {
      if (err) {
        console.log(err)
        res.render('edit')
      } 
      else {
        res.redirect('/books')
      }
    })
})

// DELETE
app.delete('/books/:id', (req, res) => {
  db.Book.findByIdAndRemove(req.params.id, function(err, book) {
    if (err) {
      console.log(err)
      res.render('show')
    } 
    else {
      res.redirect('/books')
    }
  })
})

// CATCH-ALL
app.get('*', (req, res) => {
  res.redirect('/books')
})


app.listen(3000, function() {
  console.log("Listening on port 3000...")
});

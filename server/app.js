const express = require('express')
// const mongoose = require('mongoose');
const app = express();


// mongoose.connect('mongodb://localhost/myappdatabase');

app.get('/', (req, res) => {
  res.send("Hello World")
})

app.listen(3000, function() {
  console.log("Listening on port 3000...")
});

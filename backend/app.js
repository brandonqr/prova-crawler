const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const searchController = require('./search-controller.js');

const port = 3000;

const app = express();

app.use(bodyParser.json({ extended: true }));

app.post('/search', searchController.search);

// app.listen(port, () => console.log(`Example app listening on port ${port}!`))


mongoose.connect(
    'mongodb://127.0.0.1:27017',{ useNewUrlParser: true },
  )
  .then(result => {
    console.log('Server running..')
    app.listen(port);
  }) 
  .catch(err => {
    console.log(err);
  }
);

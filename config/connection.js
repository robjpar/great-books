const mongoose = require('mongoose');

// Link to mLab MongoDB (Heroku) or local MongoDB
const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost/great_books_db';

// Connect to the Mongo DB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true
});

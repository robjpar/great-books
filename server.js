const mongoose = require("mongoose");
const express = require("express");
const path = require("path");

// Link to mLab MongoDB (Heroku) or local MongoDB
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/prudent_pantry_db";

// Connect to the Mongo DB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true
});

// Server configuration
const app = express();
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(express.json());
app.use(express.static(path.join(__dirname, "client", "build")));

// Routing
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, function() {
  console.log(`Server ${__filename} listening on http://localhost:${port}`);
});

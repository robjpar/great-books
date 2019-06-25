const express = require('express');
const path = require('path');
const routes = require('./routes');

// Connect to MongoDB
require('./config/connection');

// Server configuration
const app = express();
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(express.json());
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'build')));
}

// Routing
app.use(routes);

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, function() {
  console.log(`Server ${__filename} listening on port ${port}`);
});

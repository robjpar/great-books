const router = require('express').Router();
const bookRoutes = require('./books');

// API routes
router.use('/books', bookRoutes);

module.exports = router;

const router = require('express').Router();
const booksController = require('../../controllers/booksController');

// /api/books
router
  .route('/')
  .get(booksController.findAll)
  .post(booksController.create);

// /api/books/:id
router.route('/:id').delete(booksController.remove);

module.exports = router;

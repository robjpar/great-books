const db = require('../models');

module.exports = {
  findAll: function(req, res) {
    db.Book.find(req.query)
      .sort({ date: -1 })
      .then(books => res.json(books))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Book.findOneAndUpdate(
      {
        id: req.body.id
      },
      {
        $set: req.body
      },
      {
        upsert: true,
        new: true
      }
    )
      .then(book => res.json(book))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Book.findById({ _id: req.params.id })
      .then(book => book.remove())
      .then(book => res.json(book))
      .catch(err => res.status(422).json(err));
  }
};

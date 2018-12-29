const express = require('express');
const router = express.Router();
const Book = require('../../models/Book');
const keys = require('../../config/keys');

// get all books
router.get('/all', (req, res) => {
  Book.find({})
    .then(books => {
      if (!books) {
        return res.status(404).json({ 'no books': 'there were no books in the DB' });
      }
      res.json(books);
    })
    .catch(err => res.status(404).json(err));
});

// get book by id
router.get('/book/:book_id', (req, res) => {
  Book.findOne({ _id: req.params.book_id })
    .then(book => {
      if (!book) {
        return res.status(404).json({ 'no such book': 'this id did not match a book' });
      }
      res.json(book);
    })
    .catch(err => res.status(404).json(err));
});

// create or update book
router.post('/', (req, res) => {
  const bookFields = {};
  const bookFieldNames = [
    'title',
		'pages',
		'publisher',
		'publishedAt',
		'releasedAt',
		'isbn13',
		'cover',
		'cloudinarySecureUrl'
	];
  
  bookFieldNames.forEach(field => {
    if (req.body[field]) {
      bookFields[field] = req.body[field];
    }
  });
  
  if (typeof req.body.authors !== 'undefined') {
    bookFields.authors = req.body.authors;
  }
  
	Book.findOne({ _id: req.body.book_id })
		.then(book => {
			if (book) {
        // book exists, update it
        Book.findOneAndUpdate({ _id: req.body.book_id }, { $set: bookFields }, { new: true })
          .then(book => res.json(book));
			} else {
        // create book
        new Book(bookFields).save()
          .then(book => res.json(book))
          .catch(err => console.log('Couldn\'t save book:', err));
			}
		});
});

// delete book
router.delete('/book/:book_id', (req, res) => {
    Book.deleteOne({ _id: req.params.book_id })
      .then(() => res.json({ 'book deleted': 'success' }))
      .catch(err => console.log('Couldn\'t delete book:', err));
  }
);

module.exports = router;

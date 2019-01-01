const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
	title: {
		type: String,
		required: true,
    max: 30
	},
	authors: [{
		firstname: {
      type: String,
      required: true,
      max: 20
    },
		lastname: {
      type: String,
      required: true,
      max: 20
		}
	}],
	pages: {
		type: Number,
		required: true,
    max: 10000
	},
	publisher: {
		type: String
	},
	publishedAt: {
		type: Date,
		default: Date.now
	},
  releasedAt: {
    type: Date,
    default: Date.now
  },
  isbn13: {
    type: String
  },
	cover: {
		type: Object
	},
	cloudinarySecureUrl: {
		type: String
	}
});

module.exports = Book = mongoose.model('books', BookSchema);

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const keys = require('./config/keys');

const books = require('./routes/api/books');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(keys.mongoURI, { useNewUrlParser: true })
	.then(() => console.log('MongoLab connected'))
	.catch(error => console.log('MongoLab connection error:', error));

// use this route when in development
app.use('/api/books', books);

// serve static assets when in production
if (process.env.NODE_ENV === 'production') {
	// set static folder
	app.use(express.static('client/build'));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
	});
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`BookLister server is running on port ${port}`));

import axios from 'axios';
import { GET_BOOKS, GET_BOOK, BOOKS_LOADING, BOOK_LOADING, DELETE_BOOK, GET_ERRORS } from './types';

// get all books
export const getBooks = () => (dispatch) => {
  dispatch(setBooksLoading());
  
  axios.get('/api/books/all')
    .then(res => dispatch({
      type: GET_BOOKS,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_BOOKS,
      // payload: err.response.data
      payload: {}
    }));
};

// get book
export const getBook = (book_id) => (dispatch) => {
  dispatch(setBookLoading());
  
  axios.get(`/api/books/book/${book_id}`)
    .then(res => dispatch({
      type: GET_BOOK,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_BOOK,
      // payload: err.response.data
      payload: {}
    }));
};

// add book
export const addBook = (bookData, history) => (dispatch) => {
	console.log('bookData from bookActions:', bookData);

	const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dlzbcvsbf/upload';
	const cloudinaryUploadPreset = 'hvqidzpj';

	const formData = new FormData();

	bookData.cover && bookData.cover[0] && formData.append('file', bookData.cover[0]);
	console.log('bookData.cover:', bookData.cover);

	formData.append('upload_preset', cloudinaryUploadPreset);

	if (!bookData.cover[0]) {
		if (bookData.removeCover) {
			bookData.cloudinarySecureUrl = '';
		}

		axios.post('/api/books', bookData)
			.then(res => {
				console.log('bookActions bookData when saving book w/o cover:', bookData);
				console.log('bookActions addBook res when saving book w/o cover:', res.data);
				history.push('/')
			})
			.catch(err => dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			}));
	} else {
		axios({
			url: cloudinaryUrl,
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			data: formData
		})
			.then(res => {
				console.log('Cloudinary image upload res from bookActions.js:', res);
				// cover image isn't stored to DB no need to send it to server
				delete bookData.cover;
				bookData.cloudinarySecureUrl = res.data.secure_url;

				axios.post('/api/books', bookData)
					.then(res => {
						console.log('bookActions addBook res when saving book with cover:', res.data);
						history.push('/')
					})
					.catch(err => dispatch({
						type: GET_ERRORS,
						payload: err.response.data
					}));
			})
			.catch(error => {
				console.log('Cloudinary image upload error:', error.message);
				history.push('/');
			});
	}
};

// delete book
export const deleteBook = (id, history) => (dispatch) => {
  axios.delete(`/api/books/book/${id}`)
    .then(res => {
      dispatch({
        type: DELETE_BOOK,
        payload: id
      });
      
      history.push('/');
    })
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data      
    }));
};

export const setBooksLoading = () => ({
  type: BOOKS_LOADING
});

export const setBookLoading = () => ({
	type: BOOK_LOADING
});

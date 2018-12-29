import { combineReducers } from 'redux';
import booksReducer from './booksReducer';
import bookReducer from './bookReducer';
import filterReducer from './filterReducer';
import { reducer as addBookFormReducer } from 'redux-form';

export default combineReducers({
	books: booksReducer,
  book: bookReducer,
  form: addBookFormReducer,
  filter: filterReducer
});

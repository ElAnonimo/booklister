import {
	GET_BOOKS,
	BOOKS_LOADING,
	DELETE_BOOK
} from '../actions/types';

const initialState = {
  books: [],
	loading: false
};

const booksReducer = (state = initialState, action) => {
  switch(action.type) {
    case BOOKS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_BOOKS:
      return {
        ...state,
        books: action.payload,
        loading: false
      };
    case DELETE_BOOK:
      return {
        books: [...state.books.filter(book => book._id !== action.payload.id)]
      };
    default:
      return state;
  }
};

export default booksReducer;

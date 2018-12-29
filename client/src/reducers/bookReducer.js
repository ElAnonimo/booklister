import { GET_BOOK, BOOK_LOADING } from '../actions/types';

const initialState = {
  book: {},
	loading: false
};

export default function(state = initialState, action) {
  switch(action.type) {
		case BOOK_LOADING:
			return {
				...state,
				loading: true
			};
    case GET_BOOK:
      return {
        ...state,
        book: action.payload,
        loading: false
      };
    default:
      return state;
  }
}

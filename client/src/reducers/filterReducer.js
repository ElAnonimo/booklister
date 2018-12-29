import { SORT_BY_TITLE, SORT_BY_RELEASED_AT } from '../actions/types';

const initialState = {
  sortBy: 'title'
};

export default function(state = initialState, action) {
  switch(action.type) {
    case SORT_BY_TITLE:
      return {
        ...state,
        sortBy: 'title'
      };
    case SORT_BY_RELEASED_AT:
      return {
        ...state,
        sortBy: 'releasedAt'
      };
    default:
      return state;
  }
};

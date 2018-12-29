import { SORT_BY_TITLE, SORT_BY_RELEASED_AT } from './types';

// sort by title
export const sortByTitle = () => ({
  type: SORT_BY_TITLE
});

// sort by released at
export const sortByReleasedAt = () => ({
  type: SORT_BY_RELEASED_AT
});

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getBooks } from '../actions/bookActions';
import Spinner from './Spinner';
import BookItem from './BookItem';
import SortSelect from './SortSelect';

class BookList extends Component {
  componentDidMount() {
    this.props.getBooks();
  }

  applySorting(books) {
  	const sortBy = this.props.filter.sortBy;

  	if (!sortBy) {
  		return books;
		}

		if (sortBy === 'title') {
  		return books.sort((a, b) => a[sortBy].toLowerCase() < b[sortBy].toLowerCase() ? -1 : 1);
		}

		return books.sort((a, b) => a[sortBy] < b[sortBy] ? -1 : 1);
	}

  render() {
    const { books, loading } = this.props.books;
    
    let booksContent;
    
    if (!books || loading) {
      booksContent = <Spinner />;
    } else {
      if (books.length > 0) {
        booksContent = this.applySorting(books).map(book => <BookItem book={book} key={book._id} />);
      } else {
        booksContent = <h4>No books found</h4>;
      }
    }
    
    return (
      <div className='feed'>
				<div className='row'>
					<div className='col-md-12'>
						<div className='d-flex justify-content-between align-items-center'>
							<SortSelect />
							<Link to='/addbook' className='btn btn-primary'>Add Book</Link>
						</div>
						{booksContent}
					</div>
				</div>
			</div>
    );
  }
}

BookList.propTypes = {
  books: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
	filter: PropTypes.object.isRequired,
  getBooks: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	books: state.books,
	filter: state.filter
});

export default connect(mapStateToProps, { getBooks })(BookList);

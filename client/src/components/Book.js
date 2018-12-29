import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from './Spinner';
import AddBookForm from './AddBookForm';
import { getBook, addBook, deleteBook } from '../actions/bookActions';

class Book extends Component {  
  componentDidMount() {
    if (this.props.match.params.book_id) {
      this.props.getBook(this.props.match.params.book_id);
    }
  }
  
  onSubmit(formData) {
    const authors = formData.authors;
    const authorsToArray = [];
    const authorsArray = authors.split(',');
    
    for (let ath of authorsArray) {
      const firstname = ath.trim().split(' ')[0];
      const lastname = ath.trim().split(' ')[1] || '';
      
      authorsToArray.push({
        firstname,
        lastname
      });
    }
    
    formData.authors = authorsToArray;
    
    this.props.addBook(formData, this.props.history);
  }
  
  onDeleteClick(id) {
    this.props.deleteBook(id, this.props.history);
  }
  
  render() {
    const { book, loading } = this.props.book;
    
    let bookContent;
    
    if (!book || loading) {
      bookContent = <Spinner />;
    } else {
      bookContent = (
        <div>
					<div className='d-flex justify-content-between align-items-center mt-3'>
						<Link to='/' className='btn btn-success'>Home</Link>
						<button
							type='button'
							className='btn btn-danger'
							onClick={this.onDeleteClick.bind(this, book._id)}
						>Delete Book
						</button>
					</div>
          <AddBookForm book={book} onSubmit={this.onSubmit.bind(this)} />
        </div>
      );
    }
    
    return (
      bookContent
    );
  }
}

Book.propTypes = {
	book: PropTypes.object.isRequired,
	getBook: PropTypes.func.isRequired,
	addBook: PropTypes.func.isRequired,
	deleteBook: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  book: state.book
});

export default connect(mapStateToProps, { getBook, addBook, deleteBook })(withRouter(Book));

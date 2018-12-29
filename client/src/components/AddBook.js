import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import AddBookForm from './AddBookForm';
import { addBook } from '../actions/bookActions';

class AddBook extends Component {
  constructor(props) {
    super(props);
    
    this.onAddBookFormSubmit = this.onAddBookFormSubmit.bind(this);
  }
  
  onAddBookFormSubmit(bookData) {
    const authors = bookData.authors;
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
    
    bookData.authors = authorsToArray;

		this.props.addBook(bookData, this.props.history);
  }
  
  render() {
    return (
    	<div>
				<Link to='/' className='btn btn-success mt-3'>Home</Link>
				<AddBookForm onSubmit={this.onAddBookFormSubmit} />
			</div>
    );
  }
}

AddBook.propTypes = {
	addBook: PropTypes.func.isRequired
};

export default connect(null, { addBook })(withRouter(AddBook));

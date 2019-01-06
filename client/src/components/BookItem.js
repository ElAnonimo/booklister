import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from './Spinner';
import Moment from 'react-moment';

class BookItem extends Component {
  render() {
    const { book } = this.props;

    let names = '';
		const authors = book.authors && book.authors.map(ath => {
			let str = `${ath.firstname} ${ath.lastname}, `;
			names = names + str;
		});
		names = names.slice(0, -2);

    let bookContent;
    
    if (!book) {
      bookContent = <Spinner />;
    } else {
      bookContent = (
        <div className='card card-body bg-light mb-3'>
          <div className='row'>
            <div className='col-lg-6 col-md-4 col-8'>
              <h3><Link to={`/book/${book._id}`}>{book.title}</Link></h3>
							<table className='table'>
								<tbody>
								<tr>
									<th>Book ID</th>
									<td>{book._id}</td>
								</tr>
								<tr>
									<th>Book Authors</th>
									<td>{names}</td>
								</tr>
								<tr>
									<th>Pages</th>
									{book.pages ? <td>{book.pages}</td> : <td>n/a</td>}
								</tr>
								<tr>
									<th>Publisher</th>
									{book.publisher ? <td>{book.publisher}</td> : <td>n/a</td>}
								</tr>
								<tr>
									<th>ISBN-13</th>
									{book.isbn13 ? <td>{book.isbn13}</td> : <td>n/a</td>}
								</tr>
								<tr>
									<th>Published At</th>
									{book.publishedAt ? <td><Moment format='MM.DD.YYYY'>{book.publishedAt}</Moment></td> : <td>n/a</td>}
								</tr>
								<tr>
									<th>Released At</th>
									{book.releasedAt ? <td><Moment format='MM.DD.YYYY'>{book.releasedAt}</Moment></td> : <td>n/a</td>}
								</tr>
								</tbody>
							</table>
            </div>
						<div className='col-lg-6 col-md-4 col-8 d-flex flex-column align-content-between'>
							<h3>&nbsp;</h3>
							<table className='table'>
								<tbody>
									<tr>
										<th className='text-center'>Cover</th>
									</tr>
									<tr>
										<td className='d-flex justify-content-center align-items-center'>
											{book.cloudinarySecureUrl
												? <img src={book.cloudinarySecureUrl} className='book-item-cover' />
												: <h1 className='book-item-cover d-flex align-items-center mb-0'>No Image</h1>
											}
										</td>
									</tr>
								</tbody>
							</table>
						</div>
          </div>
        </div>
      );
    }
    
    return bookContent;
  }
}

BookItem.propTypes = {
  book: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired
};

export default BookItem;

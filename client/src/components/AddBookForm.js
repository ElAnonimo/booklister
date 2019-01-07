import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Field, reduxForm, formValueSelector} from 'redux-form';
import PropTypes from 'prop-types';
import moment from 'moment';

const renderField = ({
  input,
  label,
  type,
  comment,
	sup,
  meta: { touched, error, warning }
}) => (
  <div>
    <label>{label}</label>
		<span className='text-danger h6'>{sup}</span>
    <div>
			<input {...input} placeholder={label} type={type} className='form-control' />
      <p>
        <small className='form-text'>{comment}</small>
				{touched &&
					((error && <small className='text-danger'>{error}</small>) ||
						(warning && <small className='text-info'>{warning}</small>))
				}
			</p>
    </div>
  </div>
);

const fileField = ({ input, type, label, disabled, comment, cover, meta: { touched, error, warning } }) => {
	delete input.value;

	return (
		<div>
			<div><label>{label}</label></div>
			<div>{cover}</div>
			<label className='btn btn-secondary select-cover'>
				Select Cover
				<input {...input} hidden type={type} disabled={disabled} />
			</label>
			<p>
				<small className='form-text'>{comment}</small>
				{touched &&
					((error && <small className='text-danger'>{error}</small>) ||
						(warning && <small className='text-info'>{warning}</small>))
				}
				</p>
		</div>
	);
};

const required = value => value || typeof value === 'number' ? undefined : 'Required';
const maxLength = max => value => value && value.length > max ? `Must be ${max} characters or less` : undefined;
const maxLength30 = maxLength(30);
const maxPages = max => value => value > max ? `Must be less than ${max}` : undefined;
const maxPages10000 = maxPages(10000);
const minPages = min => value => value < min ? `Must be greater than ${min}` : undefined;
const minPages0 = minPages(0);
const notEarlier = year => value => moment(year).isSameOrBefore(moment(value, 'YYYY')) ? undefined : `Must be not before ${moment(year).format( 'MM.DD.YYYY')}`;
const notEarlier1800 = notEarlier('1800-01-01');
const alphaNumeric = value => value && /[^a-zA-Z0-9 -/]/i.test(value) ? 'Only alphanumeric characters, -, or /' : undefined;
const numeric = value => value && /[^0-9]/i.test(value) ? 'Only numeric characters' : undefined;
const isbn13 = value => value && /\x20*(?=.{17}$)97(?:8|9)([ -])\d{1,5}\1\d{1,7}\1\d{1,6}\1\d$/.test(value) ? undefined : 'Wrong ISBN-13';
const authorMaxLength20 = (value = '') => {
  const authors = value.split(',') || '';
  
  for (let ath of authors) {
    const firstname = ath.trim().split(' ')[0];
    if (!firstname) {
      return 'A first name is required';
    }
    
    if (!ath.trim().split(' ')[1]) {
      return 'A last name is required';
    }
    
    const lastname = ath.trim().split(' ')[1];
    
    if (firstname.length > 20 || lastname.length > 20) {
      return 'A first name or a last name exceeds 20 characters';
    }
  }
};

class AddBookForm extends Component {
  componentDidMount() {
  	this.handleInitialize();
  }
  
  handleInitialize() {
    let names = '';
    
    if (this.props.book) {
      const authors = this.props.book.authors && this.props.book.authors.map(ath => {
        let str = `${ath.firstname} ${ath.lastname}, `;
        names = names + str;
      });
      names = names.slice(0, -2);
    }
  
    const initData = {
      'title': this.props.book && this.props.book.title || '',
      'pages': this.props.book && this.props.book.pages || 0,
      'publisher': this.props.book && this.props.book.publisher || '',
      'publishedAt': this.props.book && moment(this.props.book.publishedAt).format('MM.DD.YYYY') || '',
      'releasedAt': this.props.book && moment(this.props.book.releasedAt).format('MM.DD.YYYY') || '',
      'isbn13': this.props.book && this.props.book.isbn13 || '',
      'cover': this.props.book && this.props.book.cover || [],
      'authors': names,
      book_id: this.props.book && this.props.book._id
    };

    this.props.initialize(initData);
  }

  render() {
    const { onSubmit, handleSubmit, pristine, reset, submitting } = this.props;
    
    return (
      <form onSubmit={handleSubmit(onSubmit)} className='mt-3 mb-3'>
				<p className='align-middle'>Required fields are marked with<span className='text-danger h6'>*</span></p>
        <Field className='form-group'
          name='title'
					sup='*'
          type='text'
          component={renderField}
          label='Title'
          validate={[required, maxLength30]}
          warn={alphaNumeric}
          comment='Please provide a title. Max 30 characters. Required'
        />
        <Field
          name='pages'
					sup='*'
          type='number'
          component={renderField}
          label='Total Pages'
          validate={[required, minPages0, maxPages10000]}
          warn={numeric}
          comment='Please provide a total page number. Max 10,000. Required'
        />
        <Field
          name='publisher'
          type='text'
          component={renderField}
          label='Publisher'
          validate={[maxLength30]}
          warn={alphaNumeric}
          comment='Please provide a publisher name. Optional'
        />
        <Field
          name='publishedAt'
          type='text'
          component={renderField}
          label='Published At'
          warn={[notEarlier1800]}
          comment='Please provide a publication year as YYYY. Optional'
        />
        <Field
          name='releasedAt'
          type='text'
          component={renderField}
          label='Released At'
          warn={[notEarlier1800]}
          comment='Please provide a release date as YYYY-MM-DD. Optional'
        />
        <Field
          name='isbn13'
          type='text'
          component={renderField}
          label='ISBN-13'
          warn={[isbn13, alphaNumeric]}
          comment="Please provide an ISBN-13. E.g. '978-1-4028-9462-6' w/o quotes. Optional"
        />
        <Field
          name='cover'
          type='file'
          component={fileField}
          label='Cover'
          comment='Please provide a cover. Optional'
					cover={this.props.book && this.props.book.cloudinarySecureUrl ? <img src={this.props.book.cloudinarySecureUrl} className='book-item-cover' /> : <span>No Image</span>}
        />
				<Field
					name='removeCover'
					type='checkbox'
					label='Remove Cover'
					component={renderField}
				/>
        <Field
          name='authors'
					sup='*'
          type='text'
          component={renderField}
          label='Authors'
          validate={[authorMaxLength20, alphaNumeric]}
          comment='Please provide author name(s). Name(s) should be comma separated. E.g. Tom Hanks(, John Doe). Required'
        />
        <button
          disabled={submitting}
          className='btn btn-primary mr-3'
        >
					{this.props.book ? 'Save Edits' : 'Add Book'}
        </button>
        <button type='button' disabled={pristine || submitting} onClick={reset} className='btn btn-secondary'>
          Clear Values
        </button>
      </form>
    );
  }
}

const selector = formValueSelector('AddBookForm');

AddBookForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
	const removeCover = selector(state, 'removeCover');

	return removeCover;
};

export default AddBookForm = connect(null)(reduxForm({
  form: 'AddBookForm'
})(AddBookForm));

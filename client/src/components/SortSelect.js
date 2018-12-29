import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sortByTitle, sortByReleasedAt } from '../actions/filterActions';

class SortSelect extends Component {
  render() {
    const onSortByChange = (evt) => {
      if (evt.target.value === 'title') {
        this.props.sortByTitle();
      } else if (evt.target.value === 'releasedAt') {
        this.props.sortByReleasedAt();
      }
    };
    
    return (
			<div className='dropdown mb-3 mt-3'>
				<span className='align-middle mr-3'>Sort By</span>
				<select className='btn btn-secondary dropdown-toggle bg-light text-dark text-left'
					value={this.props.filter.sortBy}
					onChange={onSortByChange}
				>
					<option value='title' className='dropdown-item text-left'>Title</option>
					<option value='releasedAt' className='dropdown-item text-left'>Released At</option>
				</select>
			</div>
    );
  }
}

SortSelect.propTypes = {
	filter: PropTypes.object.isRequired,
	sortByTitle: PropTypes.func.isRequired,
	sortByReleasedAt: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  filter: state.filter
});

const mapDispatchToProps = (dispatch) => ({
	sortByTitle: () => dispatch(sortByTitle()),
	sortByReleasedAt: () => dispatch(sortByReleasedAt()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SortSelect);

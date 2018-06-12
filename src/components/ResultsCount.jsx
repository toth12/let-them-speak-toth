import React from 'react';
import PropTypes from 'prop-types';

const ResultsCount = props => (
  <div className='results-count-container'>
    <span><b>Results </b></span>
    <span className='results-count'>
      <span>There are </span>
      <span><b>{props.resultCount}</b> </span>
      <span>results for your search</span>
    </span>
  </div>
)

ResultsCount.PropTypes = {
  resultCount: PropTypes.number.isRequired,
}

export default ResultsCount;

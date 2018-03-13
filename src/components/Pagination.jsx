import React from 'react';
import PropTypes from 'prop-types';

const maxPages = 7;

const Pagination = props => (
  <div className='pagination'>
    <div className='arrow left-arrow' onClick={props.leftArrowClick} />
    {getPages(props.items, props.start, props.perPage).map((p, idx) => (
      <div key={idx}
        className={getClass(p, props.start, props.perPage)}
        onClick={props.pageClick.bind(null, p-1)}>{p}</div>
    ))}
    <div className='arrow right-arrow'
      onClick={props.rightArrowClick} />
  </div>
)

/**
* Return the class of a pagination button {active or not}
* @args:
*   {int} pageNum: the 1 based page number
*   {int} activeNum: the 0 based currently active page
*   {int} perPage: the number of items per page
* @returns:
*   {str} the classname for the page
**/

const getClass = (pageNum, activeNum, perPage) => {
  return pageNum === (activeNum/perPage) + 1 ? 'page-button active' : 'page-button';
}

/**
* Return a list of page integers for each page to express
* @args:
*   {int} total: the total number of items in the result set
*   {int} start: the index position of the first item to render
* @returns:
*   {arr} a list of integers, one per page to render
**/

const getPages = (total, start, perPage) => {
  const allPages = Array.from(new Array(parseInt(total/perPage)), (i, idx) => idx + 1);
  let firstPage = start / perPage;
  if (firstPage <= 3) {
    firstPage = 0;
  } else {
    firstPage = firstPage - 3;
  }
  return allPages.slice(firstPage, firstPage + maxPages);
}

export default Pagination;
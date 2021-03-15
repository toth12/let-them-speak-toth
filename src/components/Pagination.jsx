import React from 'react';
import PropTypes from 'prop-types';

// must be odd
const maxPages = 7;


const Pagination = props => (
  <div className='pagination'>
    <div className='arrow left-arrow' onClick={props.leftArrowClick} />
    {getPages(props.items, props.activePage, props.perPage).map((p, idx) => (
      <div key={idx}
        className={p-1 === props.activePage ? 'page-button active' : 'page-button'}
        onClick={props.pageClick.bind(null, p-1)}>{p}</div>
    ))}
    <div className='arrow right-arrow'
      onClick={props.activePage + 1 < Math.ceil(props.items / props.perPage) ? props.rightArrowClick : ()=>{}} />
  </div>
)

/**
* Return a list of page integers for each page to express
* @args:
*   {int} total: the total number of items in the result set
*   {int} activePage: the 0-based index position of the active page
* @returns:
*   {arr} a list of integers, one per page to render
**/

const getPages = (total, activePage, perPage) => {

  // rewrote this so the logic would be easier to follow
  // after encountering some inscrutible bug in the previous iteration.

  // compute total number of pages
  const totalPages = Math.ceil(total / perPage)
  
  // create an array of all pages
  const allPages = Array(totalPages).fill(0).map((i, idx) => idx + 1)

  // if we don't have more than maxPages, then no windowing is required
  if (totalPages <= maxPages){ return allPages }

  // Determine naively how many pages should be on each side of the 
  // active page (when there are enough pages)
  const pagesOnEachSide = Math.floor(maxPages / 2);
  
  // Determine our initial window, which may exceed the bounds of
  // the allPages array. We'll correct that in the next step
  let firstPage = activePage - pagesOnEachSide;
  let lastPage = activePage + pagesOnEachSide;

  // determine if we need to shift left or right to avoid exceeding
  // the available page array on either end
  const shiftLeft = Math.max(0, lastPage - (totalPages - 1));
  const shiftRight = Math.abs(Math.min(0, firstPage));

  // shift as needed
  if (shiftLeft > 0){
    firstPage -= shiftLeft; 
    lastPage -= shiftLeft;
  }
  if (shiftRight > 0){
    firstPage += shiftRight;
    lastPage += shiftRight;
  }

  return allPages.slice(firstPage, lastPage + 1)

}

Pagination.PropTypes = {
  activePage: PropTypes.number.isRequired,
  items: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  leftArrowClick: PropTypes.func.isRequired,
  pageClick: PropTypes.func.isRequired,
  rightArrowClick: PropTypes.func.isRequired,
}

export default Pagination;
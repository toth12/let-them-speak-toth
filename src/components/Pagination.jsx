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
  
  const allPages = Array.from(new Array(Math.ceil(total/perPage)), (i, idx) => idx + 1);
  const firstPage = activePage <= (maxPages - 1)/2 ? 0 : activePage - 3;

  // return allPages.slice(firstPage, firstPage + maxPages);

  // BUGFIX - Need to prevent window from sliding past allPages.length;
  const lastPage = Math.min(allPages.length, firstPage + maxPages);

  const range = [lastPage - maxPages, lastPage];

  return allPages.slice(...range);

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
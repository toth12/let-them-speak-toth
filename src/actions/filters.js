// filter actions
import { get } from './get';
import config from '../config/client';

/**
* Filter levels
**/

export const receiveFilterLevels = levels => ({
  type: 'RECEIVE_FILTER_LEVELS', levels: levels,
})

export const handleFilterError = () => ({
  type: 'HANDLE_FILTER_ERROR',
})

export const clearFilters = () => ({
  type: 'CLEAR_FILTERS',
})

// get all distinct levels for filter fields -- if
// the user has selected values for one or more
// filters, return only those distinct levels available
// in records with the selected values
export const getFilterLevels = () => {
  return (dispatch, getState) => {
    let url = config.endpoint + 'filters';
    url += getFilterQueryParams(getState);
    get(url,
      data => dispatch(receiveFilterLevels(JSON.parse(data))),
      err => dispatch(handleFilterError(err)))
  }
}

/**
* Set the value of a filter field
**/

export const setFilterValue = (field, value) => {
  return dispatch => {
    dispatch({type: 'SET_FILTER_VALUE', field, value})
    dispatch(getFilterLevels())
  }
}

export const setYearRange = obj => ({
  type: 'SET_YEAR_RANGE', obj: obj,
})

/**
* Searching
**/

// Return state.filters.selected serialized as a url param string
export const getFilterQueryParams = getState => {
  let url = '';
  let selected = getState().filters.selected;
  let selectedKeys = Object.keys(selected).filter(k => selected[k]);
  if (selectedKeys.length) {
    url += '?';
    selectedKeys.map((k, idx) => {
      url += k + '=' + encodeURIComponent(selected[k]);
      if (idx + 1 < selectedKeys.length) url += '&';
    })
  }
  const years = getState().filters.years;
  if (years.min && years.max) {
    url += url ? '&' : '?';
    url += 'min_year=' + years.min + '&';
    url += 'max_year=' + years.max;
  }
  return url;
}

/**
* Typeahead
**/

export const handleTypeaheadResults = (field, query, data) => ({
  type: 'HANDLE_TYPEAHEAD_RESULTS', field: field, query: query, data: data,
})

export const handleTypeaheadErr = (field, query) => ({
  type: 'HANDLE_TYPEAHEAD_ERROR', field: field, query: query,
})

export const getTypeahead = (field, query) => {
  return dispatch => {
    get(config.endpoint + 'typeahead?field=' + field + '&query=' + query,
      data => dispatch(handleTypeaheadResults(field, query, JSON.parse(data))),
      err => dispatch(handleTypeaheadErr(field, query, err)))
  }
}

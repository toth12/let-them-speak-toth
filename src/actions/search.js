import config from '../config/client';
import { get } from './get';
import { parse } from './parse';
import { getFilterQueryParams } from './filters';

export const perPage = 20;

export const setSearchMode = mode => ({
  type: 'SET_SEARCH_MODE', mode,
})

export const searchError = () => ({
  type: 'SEARCH_ERROR',
})

export const receiveSearchResults = obj => ({
  type: 'RECEIVE_SEARCH_RESULTS', obj,
})

export const searchInitialized = () => ({
  type: 'SEARCH_INITIALIZED',
})

export const searching = () => ({
  type: 'SEARCHING',
})

export const setSearchPage = page => ({
  type: 'SET_SEARCH_PAGE', page,
})

export const showInstructions = () => ({
  type: 'SHOW_INSTRUCTIONS',
})

/**
* Pagination Helpers
**/

export const nextPage = () => {
  return (dispatch, getState) => {
    const _state = getState();
    dispatch({type: 'NEXT_SEARCH_PAGE'})
    dispatch(fetchPageResults(_state.search.query));
  }
}

export const previousPage = () => {
  return (dispatch, getState) => {
    const _state = getState();
    dispatch({type: 'PREVIOUS_SEARCH_PAGE'})
    dispatch(fetchPageResults(_state.search.query));
  }
}

export const getPage = page => {
  return (dispatch, getState) => {
    const _state = getState();
    dispatch(setSearchPage(page));
    dispatch(fetchPageResults(_state.search.query));
  }
}

/**
* Search runners
**/

export const fetchPageResults = query => {
  return search(query, false, false);
}

export const fetchSearchResults = query => {
  return search(query, true, true);
}

const search = (query, showLoader, resetPages) => {
  return (dispatch, getState) => {
    const _state = getState();
    if (showLoader) dispatch(searching());
    if (resetPages) dispatch(dispatch(setSearchPage(0)));
    let url = config.endpoint + 'search';
    url += getFilterQueryParams(getState);
    url += url.indexOf('?') == -1
      ? '?query=' + encodeURIComponent(query)
      : '&query=' + encodeURIComponent(query)
    url += '&start=' + _state.search.page * perPage;
    get(url,
      (data) => handleSearchData(dispatch, data, query),
      (err) => dispatch(searchError(err)))
  }
}

const handleSearchData = (dispatch, data, query) => {
  data = parse(data, dispatch, searchError('unparseable JSON'));
  if (data.err) {
    dispatch(searchError(data.err))
  } else {
    dispatch(receiveSearchResults({
      result: data,
      query: query,
    }))
  }
}

import fetch from 'isomorphic-fetch';
import config from '../config/client';

export const setSearchMode = mode => ({
  type: 'SET_SEARCH_MODE', mode,
})

export const searchError = () => ({
  type: 'SEARCH_ERROR',
})

export const receiveSearchResults = results => ({
  type: 'RECEIVE_SEARCH_RESULTS', results,
})

export const searchInitialized = () => ({
  type: 'SEARCH_INITIALIZED',
})

export const fetchSearchResults = () => {
  return function(dispatch) {
    dispatch(searchInitialized());
    return fetch(config.endpoint + 'search')
      .then(response => response.json()
        .then(json => ({
          status: response.status,
          json
        })))
      .then(({ status, json }) => {
        if (status >= 400) dispatch(searchError())
        else dispatch(receiveSearchResults(json))
      }, err => { dispatch(searchError(err)) })
  }
}
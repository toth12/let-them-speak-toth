import { get } from './get';
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
    get(config.endpoint + 'search',
      (data) => dispatch(receiveSearchResults(JSON.parse(data))),
      (err) => dispatch(searchError(err)))
  }
}
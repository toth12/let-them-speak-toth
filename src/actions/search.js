import { get } from './get';
import config from '../config/client';

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

export const fetchSearchResults = query => {
  return function(dispatch) {
    dispatch(searching())
    get(config.endpoint + 'search?query=' + query,
      (data) => dispatch(receiveSearchResults({
        result: JSON.parse(data),
        query: query,
      })),
      (err) => dispatch(searchError(err)))
  }
}
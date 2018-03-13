import { get } from './get';
import config from '../config/client';

export const pageSize = 10;

const receiveData = data => ({
  type: 'RECEIVE_TABLE_OF_CONTENTS', data: data,
})

const requestError = () => ({
  type: 'TABLE_OF_CONTENTS_REQUEST_FAILED',
})

export const previousPage = () => {
  return function(dispatch) {
    dispatch({type: 'PREVIOUS_TABLE_OF_CONTENTS_PAGE'});
    dispatch(fetchTableOfContents());
  }
}

export const nextPage = () => {
  return function(dispatch) {
    dispatch({type: 'NEXT_TABLE_OF_CONTENTS_PAGE'});
    dispatch(fetchTableOfContents());
  }
}

export const getPage = page => {
  return function(dispatch) {
    dispatch({type: 'GET_TABLE_OF_CONTENTS_PAGE', page: page});
    dispatch(fetchTableOfContents());
  }
}

export const fetchTableOfContents = () => {
  return function(dispatch, getState) {
    const _state = getState();
    get(config.endpoint + 'table_of_contents?start=' + _state.contents.start,
      (data) => dispatch(receiveData(JSON.parse(data))),
      (err) => dispatch(requestError(err)))
  }
}
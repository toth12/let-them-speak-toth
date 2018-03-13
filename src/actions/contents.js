import { get } from './get';
import config from '../config/client';

export const perPage = 10;

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
    const start = _state.contents.page * perPage;
    get(config.endpoint + 'table_of_contents?start=' + start,
      (data) => dispatch(receiveData(JSON.parse(data))),
      (err) => dispatch(requestError(err)))
  }
}
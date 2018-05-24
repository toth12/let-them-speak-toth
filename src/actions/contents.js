import config from '../config/client';
import { get } from './get';
import { getFilterQueryParams } from './filters';

export const perPage = 10;

const receiveData = data => ({
  type: 'RECEIVE_TABLE_OF_CONTENTS', data: data,
})

const requestError = () => ({
  type: 'TABLE_OF_CONTENTS_REQUEST_FAILED',
})

export const previousPage = () => {
  return dispatch => {
    dispatch({type: 'PREVIOUS_TABLE_OF_CONTENTS_PAGE'});
    dispatch(fetchTableOfContents());
  }
}

export const nextPage = () => {
  return dispatch => {
    dispatch({type: 'NEXT_TABLE_OF_CONTENTS_PAGE'});
    dispatch(fetchTableOfContents());
  }
}

export const getPage = page => {
  return dispatch => {
    dispatch({type: 'GET_TABLE_OF_CONTENTS_PAGE', page: page});
    dispatch(fetchTableOfContents());
  }
}

export const fetchTableOfContents = () => {
  return (dispatch, getState) => {
    const params = getFilterQueryParams(getState);
    const start = getState().contents.page * perPage;
    let url = config.endpoint + 'table_of_contents';
    url += params
      ? params + '&start=' + start
      : '?start=' + start;
    get(url,
      data => dispatch(receiveData(JSON.parse(data))),
      err => dispatch(requestError(err)))
  }
}

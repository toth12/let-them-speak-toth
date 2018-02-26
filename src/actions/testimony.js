import fetch from 'isomorphic-fetch';
import config from '../config/client';

export const dataRequestFailed = () => ({
  type: 'TESTIMONY_DATA_REQUEST_FAILED',
})

export const receiveTestimonyData = (data) => ({
  type: 'RECEIVE_TESTIMONY_DATA', data,
})

export const hideTestimony = () => ({
  type: 'HIDE_TESTIMONY',
})

export const setTestimonyTab = (tab) => ({
  type: 'SET_TESTIMONY_TAB', tab,
})

export const fetchTestimony = (id) => {
  return function(dispatch) {
    return fetch(config.endpoint + 'testimony?testimony_id=' + id)
      .then(response => response.json()
        .then(json => ({
          status: response.status,
          json
        })))
      .then(({ status, json }) => {
        if (status >= 400) dispatch(dataRequestFailed())
        else dispatch(receiveTestimonyData(json))
      }, err => { dispatch(dataRequestFailed(err)) })
  }
}
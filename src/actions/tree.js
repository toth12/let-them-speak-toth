import fetch from 'isomorphic-fetch';
import config from '../config/client';

export const treeRequestFailed = () => ({
  type: 'TREE_DATA_REQUEST_FAILED',
})

export const receiveTreeData = data => ({
  type: 'RECEIVE_TREE_DATA', data,
})

export const setActiveIndex = idx => ({
  type: 'SET_ACTIVE_TREE_INDEX', idx,
})

export const fetchTreeData = () => {
  return function(dispatch) {
    return fetch(config.endpoint + 'tree')
      .then(response => response.json()
        .then(json => ({
          status: response.status,
          json
        })))
      .then(({ status, json }) => {
        if (status >= 400) dispatch(treeRequestFailed())
        else dispatch(receiveTreeData(json))
      }, err => { dispatch(treeRequestFailed(err)) })
  }
}
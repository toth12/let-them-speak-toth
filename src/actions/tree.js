import { get } from './get';
import config from '../config/client';

export const treeRequestFailed = (err) => ({
  type: 'TREE_DATA_REQUEST_FAILED', err,
})

export const receiveTreeData = data => ({
  type: 'RECEIVE_TREE_DATA', data,
})

export const setActiveIndex = idx => ({
  type: 'SET_ACTIVE_TREE_INDEX', idx,
})

export const fetchTreeData = () => {
  return function(dispatch) {
    get(config.endpoint + 'tree',
      (data) => handleData(dispatch, JSON.parse(data)),
      (err) => dispatch(treeRequestFailed(err)))
  }
}

const handleData = (dispatch, data) => {
  if (data.err) {
    dispatch(treeRequestFailed(data.err))
  } else {
    dispatch(receiveTreeData(data))
  }
}
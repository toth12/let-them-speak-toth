import { get } from './get';
import { parse } from './parse';
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
  return dispatch => {
    get(config.endpoint + 'tree',
      data => handleTreeData(dispatch, data),
      err => dispatch(treeRequestFailed(err)))
  }
}

const handleTreeData = (dispatch, data) => {
  data = parse(data, dispatch, treeRequestFailed('unparseable JSON'));
  if (data.err) {
    dispatch(treeRequestFailed(data.err))
  } else {
    dispatch(receiveTreeData(data))
  }
}

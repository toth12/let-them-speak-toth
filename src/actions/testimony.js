import { get } from './get';
import config from '../config/client';

export const testimonyRequestFailed = () => ({
  type: 'TESTIMONY_DATA_REQUEST_FAILED',
})

export const receiveTestimonyData = data => ({
  type: 'RECEIVE_TESTIMONY_DATA', data,
})

export const hideTestimony = () => ({
  type: 'HIDE_TESTIMONY',
})

export const setTestimonyTab = tab => ({
  type: 'SET_TESTIMONY_TAB', tab,
})

export const fetchTestimony = id => {
  return function(dispatch) {
    get(config.endpoint + 'testimony?testimony_id=' + id,
      (data) => dispatch(receiveTestimonyData(JSON.parse(data))),
      (err) => dispatch(testimonyRequestFailed(err)))
  }
}
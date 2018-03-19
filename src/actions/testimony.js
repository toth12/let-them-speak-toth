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

export const setActiveSentences = obj => ({
  type: 'SET_ACTIVE_SENTENCES', obj,
})

export const highlightSentences = obj => {
  return function(dispatch) {
    const testimonyId = obj.testimonyId;
    const start = obj.start;
    const end = obj.end;
    get(config.endpoint + 'sentences?testimony_id=' + testimonyId +
      '&token_start=' + start + '&token_end=' + end,
      (data) => dispatch(setActiveSentences(JSON.parse(data))), // eslint-disable-line indent
      (err) => dispatch(testimonyRequestFailed(err))) // eslint-disable-line indent
    dispatch({type: 'HIGHLIGHT_SENTENCES', obj})
  }
}

export const fetchTestimony = id => {
  return function(dispatch) {
    get(config.endpoint + 'testimony?testimony_id=' + id,
      (data) => dispatch(receiveTestimonyData(JSON.parse(data))),
      (err) => dispatch(testimonyRequestFailed(err)))
  }
}
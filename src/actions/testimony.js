import { get } from './get';
import { parse } from './parse';
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

export const setActiveSentences = obj => ({
  type: 'SET_ACTIVE_SENTENCES', obj,
})

export const setMediaStart = val => ({
  type: 'SET_MEDIA_START', val
})

export const highlightSentences = obj => {
  return function(dispatch) {
    dispatch({type: 'HIGHLIGHT_SENTENCES', obj});
    if (obj.lookupSentences) {
      get(config.endpoint + 'sentences?testimony_id=' + obj.testimonyId +
        '&token_start=' + obj.start + '&token_end=' + obj.end,
        (data) => dispatch(setActiveSentences(JSON.parse(data))), // eslint-disable-line indent
        (err) => dispatch(testimonyRequestFailed(err))) // eslint-disable-line indent
    } else {
      dispatch(setActiveSentences({
        sentenceStart: obj.start,
        sentenceEnd: obj.end,
      }))
    }
  }
}

export const fetchTestimony = id => {
  return function(dispatch) {
    get(config.endpoint + 'testimony?testimony_id=' + id,
      (data) => handleTestimonyData(dispatch, data),
      (err) => dispatch(testimonyRequestFailed(err)))
  }
}

const handleTestimonyData = (dispatch, data) => {
  data = parse(data, dispatch, testimonyRequestFailed());
  if (data.err) {
    dispatch(testimonyRequestFailed());
  } else if (data) {
    dispatch(receiveTestimonyData(data));
  } else {
    dispatch(testimonyRequestFailed());
  }
}
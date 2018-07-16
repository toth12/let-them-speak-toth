import { get } from './get';
import { parse } from './parse';
import config from '../config/client';

export const testimonyIsLoading = () => ({
  type: 'TESTIMONY_IS_LOADING',
})

export const testimonyRequestFailed = () => ({
  type: 'TESTIMONY_DATA_REQUEST_FAILED',
})

export const receiveTestimonyData = data => ({
  type: 'RECEIVE_TESTIMONY_DATA', data,
})

export const setActiveSentences = obj => ({
  type: 'SET_ACTIVE_SENTENCES', obj,
})

export const clearActiveMedia = () => ({
  type: 'CLEAR_ACTIVE_MEDIA',
})

export const setMediaStart = val => ({
  type: 'SET_MEDIA_START', val
})

export const setMediaIndex = val => ({
  type: 'SET_MEDIA_INDEX', index: val,
})

// when hiding the testimony, clear the active media
// so remounting the same fragment shows the proper
// active media
export const hideTestimony = () => {
  return dispatch => {
    dispatch({type: 'HIDE_TESTIMONY'})
    dispatch(clearActiveMedia())
  }
}

export const highlightSentences = obj => {
  return dispatch => {
    dispatch({type: 'HIGHLIGHT_SENTENCES', obj});
    if (obj.lookupSentences) {
      get(config.endpoint + 'sentences?testimony_id=' + obj.testimonyId +
        '&token_start=' + obj.start + '&token_end=' + obj.end,
        data => dispatch(setActiveSentences(JSON.parse(data))), // eslint-disable-line indent
        err => dispatch(testimonyRequestFailed(err))) // eslint-disable-line indent
    } else {
      dispatch(setActiveSentences({
        sentenceStart: obj.start,
        sentenceEnd: obj.end,
      }))
    }
  }
}

export const fetchTestimony = id => {
  return dispatch => {
    dispatch(testimonyIsLoading())
    get(config.endpoint + 'testimony?testimony_id=' + id,
      data => handleTestimonyData(dispatch, data),
      err => dispatch(testimonyRequestFailed(err)))
  }
}

const handleTestimonyData = (dispatch, data) => {
  data = parse(data, dispatch, testimonyRequestFailed());
  if (data.err) {
    dispatch(testimonyRequestFailed());
  } else if (data && data.testimony_id) {
    dispatch(receiveTestimonyData(data));
  } else {
    dispatch(testimonyRequestFailed());
  }
}

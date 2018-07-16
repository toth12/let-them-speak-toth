const initialState = {
  testimony: null,
  err: false,
  sentenceStart: null,
  sentenceEnd: null,
  mediaStart: null,
  mediaIndex: null,
  loading: false,
}

const testimonyReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TESTIMONY_IS_LOADING':
      return Object.assign({}, state, {
        loading: true,
      })

    case 'TESTIMONY_DATA_REQUEST_FAILED':
      return Object.assign({}, state, {
        err: true,
      })

    case 'RECEIVE_TESTIMONY_DATA':
      return Object.assign({}, state, {
        testimony: action.data,
        err: false,
        loading: false,
      })

    case 'HIDE_TESTIMONY':
      return Object.assign({}, state, {
        testimony: null,
        err: false,
      })

    case 'SET_ACTIVE_SENTENCES':
      return Object.assign({}, state, {
        sentenceStart: action.obj.sentenceStart,
        sentenceEnd: action.obj.sentenceEnd,
      })

    case 'SET_MEDIA_START':
      return Object.assign({}, state, {
        mediaStart: action.val,
      })

    case 'SET_MEDIA_INDEX':
      return Object.assign({}, state, {
        mediaIndex: action.index,
      })

    case 'CLEAR_ACTIVE_MEDIA': {
      return Object.assign({}, state, {
        sentenceStart: null,
        sentenceEnd: null,
        mediaIndex: null,
        mediaStart: null,
      })
    }

    default:
      return state;
  }
}

export default testimonyReducer;

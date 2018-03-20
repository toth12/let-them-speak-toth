const initialState = {
  testimony: null,
  err: false,
  tab: 'video',
  sentenceStart: null,
  sentenceEnd: null,
}

const testimonyReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TESTIMONY_DATA_REQUEST_FAILED':
      return Object.assign({}, state, {
        err: true,
      })

    case 'RECEIVE_TESTIMONY_DATA':
      return Object.assign({}, state, {
        testimony: action.data,
        err: false,
      })

    case 'HIDE_TESTIMONY':
      return Object.assign({}, state, {
        testimony: null,
        err: false,
      })

    case 'SET_TESTIMONY_TAB':
      return Object.assign({}, state, {
        tab: action.tab,
      })

    case 'SET_ACTIVE_SENTENCES':
      return Object.assign({}, state, {
        sentenceStart: action.obj.sentenceStart,
        sentenceEnd: action.obj.sentenceEnd,
      })

    default:
      return state;
  }
}

export default testimonyReducer;
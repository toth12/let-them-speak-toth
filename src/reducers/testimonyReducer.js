const initialState = {
  testimony: null,
  err: false,
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

    default:
      return state;
  }
}

export default testimonyReducer;
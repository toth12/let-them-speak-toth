import { pageSize } from '../actions/contents';

const initialState = {
  'testimonies': [],
  'err': null,
  'start': 0,
};

const contentsReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'RECEIVE_TABLE_OF_CONTENTS':
      return Object.assign({}, state, {
        testimonies: action.data,
        err: null,
      })

    case 'TABLE_OF_CONTENTS_REQUEST_FAILED':
      return Object.assign({}, state, {
        err: true,
      })

    case 'NEXT_TABLE_OF_CONTENTS_PAGE': {
      return Object.assign({}, state, {
        start: state.start + pageSize < state.testimonies.length ?
          (state.start + pageSize) : state.start
      })
    }

    case 'PREVIOUS_TABLE_OF_CONTENTS_PAGE': {
      return Object.assign({}, state, {
        start: state.start - pageSize > 0 ?
          (state.start - pageSize) : 0
      })
    }

    case 'GET_TABLE_OF_CONTENTS_PAGE': {
      return Object.assign({}, state, {
        start: action.page,
      })
    }

    default:
      return state;
  }
};

export default contentsReducer;
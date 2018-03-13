const initialState = {
  testimonies: [],
  err: null,
  page: 0,
  total: 0,
};

const contentsReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'RECEIVE_TABLE_OF_CONTENTS':
      return Object.assign({}, state, {
        testimonies: action.data.results,
        total: action.data.total,
        err: null,
      })

    case 'TABLE_OF_CONTENTS_REQUEST_FAILED':
      return Object.assign({}, state, {
        err: true,
      })

    case 'NEXT_TABLE_OF_CONTENTS_PAGE': {
      return Object.assign({}, state, {
        page: state.page + 1,
      })
    }

    case 'PREVIOUS_TABLE_OF_CONTENTS_PAGE': {
      return Object.assign({}, state, {
        page: Math.max(0, state.page - 1),
      })
    }

    case 'GET_TABLE_OF_CONTENTS_PAGE': {
      return Object.assign({}, state, {
        page: action.page,
      })
    }

    default:
      return state;
  }
};

export default contentsReducer;
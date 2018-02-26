const initialState = {
  results: [],
  resultCount: null,
  err: null,
  mode: 'simple',
  initialized: false,
}

const searchReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'SEARCH_INITIALIZED':
      return Object.assign({}, state, {
        initialized: true,
      })

    case 'SET_SEARCH_MODE':
      return Object.assign({}, state, {
        mode: action.mode,
      })

    case 'SEARCH_ERROR':
      return Object.assign({}, state, {
        err: true,
        results: [],
        resultCount: null,
      })

    case 'RECEIVE_SEARCH_RESULTS':
      return Object.assign({}, state, {
        results: action.results.results,
        resultCount: action.results.total,
        err: null,
      })

    default:
      return state
  }
}

export default searchReducer;
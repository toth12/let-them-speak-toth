const initialState = {
  searching: false,
  query: null,
  results: [],
  resultCount: null,
  err: null,
  mode: 'simple',
  instructions: true,
  start: 0,
}

const pageSize = 20;

const searchReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'SET_SEARCH_MODE':
      return Object.assign({}, state, {
        mode: action.mode,
      })

    case 'SEARCHING':
      return Object.assign({}, state, {
        searching: true,
        instructions: false,
      })

    case 'RECEIVE_SEARCH_RESULTS':
      return Object.assign({}, state, {
        searching: false,
        query: action.obj.query,
        results: action.obj.result.results,
        resultCount: action.obj.result.total,
        err: null,
        initialized: true,
      })

    case 'SEARCH_ERROR':
      return Object.assign({}, state, {
        err: true,
        results: [],
        resultCount: null,
      })

    case 'NEXT_SEARCH_PAGE':
      return Object.assign({}, state, {
        start: state.start + pageSize <= state.resultCount ?
          (state.start + pageSize) : state.start
      })

    case 'PREVIOUS_SEARCH_PAGE':
      return Object.assign({}, state, {
        start: state.start - pageSize >= 0 ?
          (state.start - pageSize) : 0
      })

    case 'GET_SEARCH_PAGE':
      return Object.assign({}, state, {
        start: action.page * pageSize,
      })

    case 'RESET_SEARCH_PAGINATION':
      return Object.assign({}, state, {
        start: 0,
      })

    default:
      return state
  }
}

export default searchReducer;
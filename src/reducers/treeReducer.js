const initialState = {
  selected: null,
  data: [],
  err: null,
};

const treeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TREE_DATA_REQUEST_FAILED':
      return Object.assign({}, state, {
        err: true,
      })

    case 'RECEIVE_TREE_DATA':
      return Object.assign({}, state, {
        data: action.data,
        err: false,
      })

    case 'SET_ACTIVE_TREE_INDEX':
      return Object.assign({}, state, {
        selected: action.idx
      })

    default:
      return state;
  }
}

export default treeReducer;
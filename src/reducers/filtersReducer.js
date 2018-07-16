const initialSelected = {
  collection: null,
  gender: null,
  interviewee_name: null,
  testimony_id: null,
  recording_year: null,
  camp_names: null,
  ghetto_names: null,
}

const initialYears = {
  min: null,
  max: null,
}

const initialErr = null;

const initialState = {
  options: {
    collections: [],
    genders: [],
    interviewee_names: [],
    testimony_ids: [],
    recording_years: [],
    camp_names: [],
    ghetto_names: [],
  },
  selected: initialSelected,
  years: initialYears,
  err: initialErr,
}

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CLEAR_FILTERS':
      return Object.assign({}, state, {
        selected: initialSelected,
        years: initialYears,
        err: initialErr,
      })

    case 'RECEIVE_FILTER_LEVELS':
      return Object.assign({}, state, {
        options: action.levels,
        err: false,
      })

    case 'HANDLE_FILTER_ERROR':
      return Object.assign({}, state, {
        err: true,
      })

    case 'SET_FILTER_VALUE':
      let updated = {};
      updated[action.field] = action.value;
      return Object.assign({}, state, {
        selected: Object.assign({}, state.selected, updated)
      })

    case 'SET_YEAR_RANGE':
      return Object.assign({}, state, {
        years: Object.assign({}, state.years, {
          min: action.obj.min,
          max: action.obj.max,
        })
      })

    default:
      return state;
  }
}

export default filterReducer;

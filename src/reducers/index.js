import { combineReducers } from 'redux';
import treeReducer from './treeReducer';
import testimonyReducer from './testimonyReducer';
import searchReducer from './searchReducer';
import contentsReducer from './contentsReducer';

export const rootReducer = combineReducers({
  tree: treeReducer,
  testimony: testimonyReducer,
  search: searchReducer,
  contents: contentsReducer,
});
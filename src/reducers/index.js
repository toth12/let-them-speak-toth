import { combineReducers } from 'redux';
import treeReducer from './treeReducer';
import testimonyReducer from './testimonyReducer';

export const rootReducer = combineReducers({
  tree: treeReducer,
  testimony: testimonyReducer,
});
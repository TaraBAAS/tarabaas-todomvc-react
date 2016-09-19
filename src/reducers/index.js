import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'

import todos from './todos';
import settings from './settings';

const rootReducer = combineReducers({
  routing: routerReducer,
  settings,
  todos
});

export default rootReducer;

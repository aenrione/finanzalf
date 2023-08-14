import auth_reducer from '../reducers/AuthReducers';
import { applyMiddleware, combineReducers } from 'redux';

import { legacy_createStore as createStore } from 'redux';
import thunk from 'redux-thunk';

const store = createStore(
  combineReducers({ auth_reducer }),
  applyMiddleware(thunk),
);

export default store;

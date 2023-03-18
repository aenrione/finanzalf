import auth_reducer from '../reducers/AuthReducers';
import object_reducer from '../reducers/ObjectReducer';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

const store = createStore(
  combineReducers({ auth_reducer, object_reducer }),
  applyMiddleware(thunk),
);

export default store;

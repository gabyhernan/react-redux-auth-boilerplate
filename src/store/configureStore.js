import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import {authReducer} from '../reducers/auth';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
  combineReducers({ // combineRedcuers takes an argument which is an object
  // the key is going to be the root state name
auth: authReducer
  }),  // & the value is going to be the reducer that is supposed to manage that
// & by using combineReducer we are notputting our object or array on the root
// we are putting the array on the expenses property
composeEnhancers(applyMiddleware(thunk))
  );
  return store;
};

// now this means that when we import the function the default export from
// configure store, we get the store back and just use it

// Combined reducers lets you combine multiple reducers to create a single store
// as opposed to one gigantic reducer you can have multiple smaller ones
// const store = createStore(expensesReducer);

// set up store configuration


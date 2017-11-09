
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider} from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { login, logout } from './actions/auth';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import {firebase} from './firebase/firebase';
import LoadingPage from './components/LoadingPage';


const store = configureStore();

// use connect for every single component that needs to connect to the Redux store

// React-redux library
// we are going to be using <Provider store> once at the root of our application
// Provider will allow us to provde the store to all of the components
const jsx = (
  <Provider store={store}>
    <AppRouter />
   </Provider>
  );

let hasRendered = false;
const renderApp = () => {
  if(!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
};
// setting loading page
// once it connect to DB on sucess show data
ReactDOM.render(<LoadingPage />, document.getElementById('app'));


// Testing to see if Auth Works
// onAuthStatechange takes a callback function & runs it when the auth status
// changes
firebase.auth().onAuthStateChanged( (user) => {
  if (user) {
    // console.log('uid', user.uid);
// diuspatch login action to save user id
    store.dispatch(login(user.uid));
    renderApp();
// redirect user if they are in loginpage
    if(history.location.pathname === '/') {
      history.push('/dashboard');
    }
    // need to ensure redirection is correct
    console.log('logged in');
  } else {
  // ensures user logs out in redux store
  store.dispatch(logout());
// re-render app so user doesnt sit on loading page indefinetely
    renderApp();
    history.push('/');
  }
});


import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from "../components/Header";
// renaming component to uppercase since we are eventually going to
//need to re render Component
export const PrivateRoute = ({isAuthenticated, component: Component, ...rest}) => (

  <Route {...rest} component={(props) => (
    isAuthenticated ? (
      <div>
      <Header/>
      <Component {...props} />
      </div>
      ) : (
      <Redirect to="/" />
      )
    )}/>

  );

// we don't need to dispatch (change) anything but we need to grab some
// values to know if user is authenticated or not
const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.uid // if true are authenticated
  // going to get undefined if we are authenticated, double exclamation mark flips
  // it to boolean values
  });


export default connect(mapStateToProps)(PrivateRoute);

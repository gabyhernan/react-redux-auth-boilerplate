import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';



export const PublicRoute = ({isAuthenticated, component: Component, ...rest}) => (

  <Route {...rest} component={(props) => (
    isAuthenticated ? (
     <Redirect to="/dashboard" />
      ) : (
      <Component {...props} />
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


export default connect(mapStateToProps)(PublicRoute);

// Higher order components - A component (HOC) that renders another component
// goal of HOC component is to reuse code
//  perform Render higjacking
// add a lil prop manipulation in
// abstract state

import React from 'react';
import ReactDOM from 'react-dom';

// this is a regular component and we could have 7 components like these
// come from HOC component
const Info = (props) => (
  <div>
    <h1> Info </h1>
    <p> The info is: {props.info} </p>
  </div>
  );

// Creating a HOC component
// 1. We want to create a function , not a React component
const withAdminWarning = (WrappedComponent) => {
  // return a new component, the component created here is the HOC component
  return (props) => (
      <div>
      {props.isAdmin && <p> This is private info. Please don't share! </p> }
    {/* where we want to create the regular component,
    so we create an instance of it   */}
    <WrappedComponent {...props} />
  {/* when instantianing a component inside of JSX we can open an close curly braces
  and spread out any given object we like - so we are taking all of the props passed
  in this HOC component & we're just passing them directly down to the child  */}
      </div>
    );
}

// It is going to get called with the component we want to wrap
const AdminInfo = withAdminWarning(Info); // what we will get back is going to be an
// alternative version of this component which is the HOC component


// requireAuthentication
// show the component when the component is authenticated
// or to show a message when they're not
const requireAuthentication = (WrappedComponent) => {
  return (props) => (
    <div>
   { props.isAuthenticated ? (
    <WrappedComponent {...props} /> ) : (
    <p> You need to log in in order to view information </p>)}
    </div>
    );
};

const AuthInfo = requireAuthentication(Info);

// Now how do we use this??
// Instead of rendering Info we just render AdminInfo

ReactDOM.render(<AuthInfo isAuthenticated={true} info="these are the details" />
  , document.getElementById('app'));


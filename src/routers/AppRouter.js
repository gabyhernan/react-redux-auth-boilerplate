import React from 'react';
import { Router, Route, Switch , Link, NavLink} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import LoginPage from '../components/LoginPage';
import DashboardPage from '../components/DashboardPage';

import NotFoundPage from '../components/NotFoundPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';



// set up Private Route in place of Route for pages user not allowed
// if they are not logged in

export const history = createHistory();



const AppRouter = () => (
    <Router history={history}>
  <div>
  <Switch>
  <PublicRoute path="/" component={LoginPage} exact={true} />
  <PrivateRoute path="/dashboard" component={DashboardPage}/>
  <Route component={NotFoundPage} />
  </Switch>
  </div>
  </Router>

  );

export default AppRouter;



// React router isn't going to render anything visible when we use it
// Have to specify individual Routes inside of Router component


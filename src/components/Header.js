import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {startLogout} from '../actions/auth';



export const Header = ({ startLogout}) => (
  <header className="header">
  <div className="content-container">
    <div className="header__content"> {/* to distribut header on flexbox */}
    <Link className="header__title" to="/dashboard"  >
      <h1> Boilerplate </h1>
    </Link>
  {/* activeClassName lets us provide a class that is only going to get applied
  to the link when we are on that page  */}
  <button onClick={startLogout}
          className="button button--link"
     > Logout </button>
        </div>
     </div>
   </header>
  );

const mapDispatchToProps = (dispatch) => ({
  startLogout: () =>  dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);

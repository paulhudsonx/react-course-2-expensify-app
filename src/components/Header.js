import React from "react";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { startLogout } from "../actions/auth";

export const Header = (props) => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <Link
          className="header__title"
          to="/dashboard"
          activeClassName="is-active"
          exact={true}
        >
          <h1>Expensify</h1>
        </Link>
        <button className="button--link" onClick={props.startLogout}>
          Logout
        </button>
      </div>
    </div>
  </header>
);

export default connect(undefined, { startLogout })(Header);

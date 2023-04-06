import React, { useContext } from "react";

import classes from "./Navigation.module.css";
import AuthContext from "../../store/auth-context";


const Navigation = () => {
  const cnxt = useContext(AuthContext);
  return (
    <nav className={classes.nav}>
      <ul>
        {cnxt.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {cnxt.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {cnxt.isLoggedIn && (
          <li>
            <button onClick={cnxt.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;

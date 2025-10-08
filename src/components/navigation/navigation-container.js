import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";

const NavigationComponent = props => {
  const dynamicLink = (route, linkText) => {
     return (
      <div className="nav-link-wrapper">
        <NavLink to={route} activeClassName="nav-link-active">
          {linkText}
        </NavLink>
      </div>
     );
    };

    const handleSignOut = () => {
    axios
      .delete("https://api.devcamp.space/logout", { withCredentials: true })
      .then(response => {
        if (response.status === 200) {
          props.history.push("/");
          props.handleSuccessfulLogout();
        }
        return response.data;
      })
      .catch(error => {
        console.log("Error signing out", error);
      });
  };

    return (
      <div className="nav-wrapper">
        <div className="center-side">
          <div className="nav-link-wrapper">
            <NavLink exact to="/" activeClassName="nav-link-active">
              HOME
            </NavLink>
          </div>

          <div className="nav-link-wrapper">
            <NavLink to="/about-me" activeClassName="nav-link-active">
              BIO
            </NavLink>
          </div>

          <div className="nav-link-wrapper">
           <NavLink to="/experience" activeClassName="nav-link-active">
              EXPERIENCE
            </NavLink>
          </div>

          <div className="nav-link-wrapper">
            <NavLink to="/contact" activeClassName="nav-link-active">
              CONTACT
            </NavLink>
          </div>

          <div className="nav-link-wrapper">
            <NavLink to="/writing" activeClassName="nav-link-active">
              WRITING
            </NavLink>
          </div>

          {props.loggedInStatus === "LOGGED_IN" ? (
            dynamicLink("/portfolio-manager", "PORTFOLIO MANAGER")
          ) : null}
        </div>

        <div className="right-side">
        Txema 
        {props.loggedInStatus === "LOGGED_IN" ? (
          <a onClick={handleSignOut}>
            <FontAwesomeIcon icon="sign-out-alt" />
          </a>
        ) : null}
      </div>
    </div>
  );
};

export default withRouter(NavigationComponent);
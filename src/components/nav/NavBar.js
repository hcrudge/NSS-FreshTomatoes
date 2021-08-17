import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./NavBar.css";
// BOOTSTRAP????

export const NavBar = (props) => {
  const history = useHistory();

  let [isActive, setIsActive] = useState("home");

  const checkNavState = (navLocation) => {
    let activeClass = "";
    if (isActive === navLocation) {
      activeClass = "active";
    }

    return activeClass;
  };

  const handleLogout = (clickEvent) => {
    clickEvent.preventDefault();
    sessionStorage.removeItem("tomato_user");
    history.push("/login");
  };

  return (

      <nav className="navbar_wrapper">
        <ul className="navbar is-spaced">
          <div className="navbar-brand">
            <img
              className="logo navbar__item"
              src="./images/FTLogo.PNG"
              alt=""
            />
          </div>
          <div className="navbar-menu is-spaced">
            <li
              className={`navbar-item is-spaced ${checkNavState("home")}`}
              onClick={() => setIsActive("home")}
            >
              <Link className="navbar_link is-black" to="/">
                Home
              </Link>
            </li>
            <li
              className={`navbar-item is-spaced ${checkNavState("friends")}`}
              onClick={() => setIsActive("friends")}
            >
              <Link className="navbar_link " to="/friends">
                Friends
              </Link>
            </li>
            <li
              className="navbar-item"
              onClick={(clickEvent) => {
                handleLogout(clickEvent);
              }}
            >
              <Link className="navbar_link" to="/login">
                Logout
              </Link>
            </li>
          </div>
        </ul>
    </nav>
  );
};

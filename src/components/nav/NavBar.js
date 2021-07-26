import React, { useState } from "react" 
import { Link, useHistory } from "react-router-dom"
import "./NavBar.css"
// BOOTSTRAP????


export const NavBar = (props) => {

    const history = useHistory()
  
    let [isActive, setIsActive] = useState("home");
    
    const checkNavState = (navLocation) => {
        let activeClass = "";
        if (isActive === navLocation) {
          activeClass = "active"
        };
  
        return activeClass;
    };
  
    const handleLogout = (clickEvent) => {
        clickEvent.preventDefault()
        sessionStorage.removeItem("tomato_user")
        history.push("/login")
    };
  
    return (
      <nav className="navbar">
        <ul className="navbar">
            <img className="logo navbar__item" src="./images/logo.PNG" alt=""/>
            <h2>Fresh Tomatoes</h2>
            <li className={`navbar__item ${checkNavState("home")}`}
                onClick={() => setIsActive("home")}>
                <Link className="navbar__link" to="/">Home</Link>
            </li>
            <li className={`navbar__item ${checkNavState("friends")}`}
                onClick={() => setIsActive("friends")}>
                <Link className="navbar__link" to="/friends">Friends</Link>
            </li>   
            <li className="navbar__item" 
              onClick={(clickEvent) => {handleLogout(clickEvent)}}>
                <Link className="navbar__link" to="/login">Logout</Link>
            </li>
        </ul>
      </nav>
    )
  };
  

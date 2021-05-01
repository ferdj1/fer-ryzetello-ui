import * as React from "react"
import {NavLink} from "react-router-dom";
import "./Header.scss";

function Header(props) {
  return (
    <div className="header header--solid">
      <NavLink to="/">
        <h1 className="header__logo">rt.Control</h1>
      </NavLink>
    </div>
  )
}

export default Header

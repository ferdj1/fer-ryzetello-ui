import * as React from "react"
import {NavLink} from "react-router-dom";
import "./Header.scss";
import {AiFillBulb, AiOutlineBulb} from "react-icons/all";

function Header(props) {
  return (
    <div className="header header--solid">
      <NavLink to="/">
        <h1 className="header__logo">rt.Control</h1>
      </NavLink>
      {props.lowLight ?
        <div className="header__button header__button--active" onClick={() => {props.setLowLight(!props.lowLight)}}><AiFillBulb className="header__button__icon--active"/> <span>Using <i>Low light</i> mode</span>
        </div>
        : <div className="header__button" onClick={() => {props.setLowLight(!props.lowLight)}}><AiOutlineBulb className="header__button__icon"/> <span>Use <i>Low light</i> mode</span>
        </div>}
    </div>
  )
}

export default Header

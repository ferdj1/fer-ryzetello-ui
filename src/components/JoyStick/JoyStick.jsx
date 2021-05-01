import * as React from "react"
import "./JoyStick.scss";

function JoyStick(props) {
  return (
    <div className="joystick">
      <div className="joystick__top-row">
        <div className="joystick__item joystick__top" onClick={props.topClickHandler}>
          {props.topIcon}
        </div>
      </div>
      <div className="joystick__mid-row">
        <div className="joystick__item joystick__left" onClick={props.leftClickHandler}>
          {props.leftIcon}
        </div>
        <div className="joystick__item joystick__center" onClick={props.centerClickHandler}>
          {props.centerIcon}
        </div>
        <div className="joystick__item joystick__right" onClick={props.rightClickHandler}>
          {props.rightIcon}
        </div>
      </div>
      <div className="joystick__bottom-row">
        <div className="joystick__item joystick__bottom" onClick={props.bottomClickHandler}>
          {props.bottomIcon}
        </div>
      </div>
    </div>
  )
}

export default JoyStick

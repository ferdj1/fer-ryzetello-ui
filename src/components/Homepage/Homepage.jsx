import * as React from "react"
import {NavLink} from "react-router-dom";
import "./Homepage.scss";
import JoyStick from "../JoyStick/JoyStick";
import FlatPlaneJoyStick from "../FlatPlaneJoyStick/FlatPlaneJoyStick";
import VerticalRotationalJoyStick from "../VerticalRotationalJoyStick/VerticalRotationalJoyStick";
import CommandHeader from "../CommandHeader/CommandHeader";
import FlipJoyStick from "../FlipJoyStick/FlipJoyStick";

function Homepage(props) {
  return (
    <div className="homepage">
      <CommandHeader />
      <div className="homepage__joysticks">
        <VerticalRotationalJoyStick />
        <FlatPlaneJoyStick />
        <FlipJoyStick />
      </div>
    </div>
  )
}

export default Homepage

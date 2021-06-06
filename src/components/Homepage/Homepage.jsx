import * as React from "react"
import FlatPlaneJoyStick from "../FlatPlaneJoyStick/FlatPlaneJoyStick";
import VerticalRotationalJoyStick from "../VerticalRotationalJoyStick/VerticalRotationalJoyStick";
import CommandHeader from "../CommandHeader/CommandHeader";
import DroneSelector from "../DroneSelector/DroneSelector";
import {useToast} from "@chakra-ui/react";
import {FaVideoSlash} from "react-icons/all";
import JsmpegPlayer from "../JsmpegPlayer/JsmpegPlayer";
import "./Homepage.scss";
import {useEffect, useState} from "react";
import {getWebSocketPort} from "../../apiClient/DronePortService";

function Homepage(props) {
  return (
    <div className="homepage">
      <DroneSelector droneIds={props.droneIds} setSelectedDroneId={props.setSelectedDroneId}/>
      {props.currentDroneControl}
    </div>
  )
}

export default Homepage

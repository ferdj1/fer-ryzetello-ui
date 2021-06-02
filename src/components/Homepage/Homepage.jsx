import * as React from "react"
import FlatPlaneJoyStick from "../FlatPlaneJoyStick/FlatPlaneJoyStick";
import VerticalRotationalJoyStick from "../VerticalRotationalJoyStick/VerticalRotationalJoyStick";
import CommandHeader from "../CommandHeader/CommandHeader";
import DroneSelector from "../DroneSelector/DroneSelector";
import {useEffect, useState} from "react";
import {useToast} from "@chakra-ui/react";
import "./Homepage.scss";
import {FaVideoSlash} from "react-icons/all";

function Homepage(props) {

  const toast = useToast();

  function displayExecuteError() {
    toast({
      title: "Error",
      description: "Can't execute!",
      status: "error",
      duration: 2000,
      isClosable: true
    })
  }

  return (
    <div className="homepage">
      <DroneSelector droneIds={props.droneIds} setSelectedDroneId={props.setSelectedDroneId}/>
      { props.selectedDroneId && <>
        <CommandHeader selectedDroneId={props.selectedDroneId}/>
        <div className="homepage__joysticks-stream">
          <VerticalRotationalJoyStick selectedDroneId={props.selectedDroneId} displayExecuteError={displayExecuteError} lowLight={props.lowLight}/>
          <div className="homepage__joysticks-stream__stream">
            <FaVideoSlash className="homepage__joysticks-stream__stream__icon"/>
          </div>
          <FlatPlaneJoyStick selectedDroneId={props.selectedDroneId} displayExecuteError={displayExecuteError} lowLight={props.lowLight}/>
        </div>
      </>}
    </div>
  )
}

export default Homepage

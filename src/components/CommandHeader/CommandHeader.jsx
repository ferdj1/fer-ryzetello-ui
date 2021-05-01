import * as React from "react"
import "./CommandHeader.scss";
import {executeCommand} from "../../apiClient/CommandService";
import {
  BACK,
  EMERGENCY,
  FORWARD,
  LAND,
  LEFT,
  RIGHT,
  STREAM_OFF,
  STREAM_ON,
  TAKEOFF,
  UP
} from "../../constants/CommandConstants";
import {DEFAULT_DISTANCE} from "../../constants/CommandParameterDefaults";
import {useState} from "react";
import {
  BsFillExclamationOctagonFill,
  FaVideo,
  FaVideoSlash,
  RiFlightLandFill,
  RiFlightTakeoffFill
} from "react-icons/all";

function CommandHeader(props) {
  const [isFlying, setFlying] = useState(false);
  const [isStreaming, setStreaming] = useState(false);

  function flyingToggleHandler() {
    let command = {
      name: isFlying ? LAND : TAKEOFF,
      params: []
    }

    setFlying(!isFlying);

    executeCommand(command)
      .then(response => {
        console.log('OK');
      }).catch(error => {
      console.log('ERROR');
    });
  }

  function streamToggleHandler() {
    let command = {
      name: isStreaming ? STREAM_OFF : STREAM_ON,
      params: []
    }

    setStreaming(!isStreaming);

    executeCommand(command)
      .then(response => {
        console.log('OK');
      }).catch(error => {
      console.log('ERROR');
    });
  }

  function emergencyClickHandler() {
    let command = {
      name: EMERGENCY,
      params: []
    }

    executeCommand(command)
      .then(response => {
        console.log('OK');
      }).catch(error => {
      console.log('ERROR');
    });
  }

  function bottomClickHandler() {
    let command = {
      name: BACK,
      params: [DEFAULT_DISTANCE]
    }

    executeCommand(command)
      .then(response => {
        console.log('OK');
      }).catch(error => {
      console.log('ERROR');
    });
  }

  return (
    <div className="command-header">
      <div className="command-header__item" onClick={flyingToggleHandler}>
        {isFlying ? <RiFlightLandFill/>: <RiFlightTakeoffFill/>}
      </div>
      <div className="command-header__item" onClick={streamToggleHandler}>
        {isStreaming ? <FaVideoSlash/>: <FaVideo/>}
      </div>
      <div className="command-header__item" onClick={emergencyClickHandler}>
        <BsFillExclamationOctagonFill />
      </div>
    </div>
  )
}

export default CommandHeader

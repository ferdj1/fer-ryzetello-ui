import * as React from "react"
import "./CommandHeader.scss";
import {executeCommand} from "../../apiClient/CommandService";
import {
  BACK,
  EMERGENCY, FLIP,
  FORWARD,
  LAND,
  LEFT,
  RIGHT,
  STREAM_OFF,
  STREAM_ON,
  TAKEOFF,
  UP
} from "../../constants/CommandConstants";
import {
  DEFAULT_DISTANCE,
  FLIP_BACK,
  FLIP_FORWARD,
  FLIP_LEFT,
  FLIP_RIGHT
} from "../../constants/CommandParameterDefaults";
import {useState} from "react";
import {
  BsFillExclamationOctagonFill,
  FaVideo,
  FaVideoSlash,
  RiFlightLandFill,
  RiFlightTakeoffFill
} from "react-icons/all";
import {isCommandValid} from "../../validator/CommandValidator";

function CommandHeader(props) {
  const [isFlying, setFlying] = useState(false);
  const [isStreaming, setStreaming] = useState(false);

  function flyingToggleHandler() {
    let command = {
      droneId: props.selectedDroneId,
      name: isFlying ? LAND : TAKEOFF,
      params: []
    }

    setFlying(!isFlying);

    if (!isCommandValid(command)) {
      return;
    }

    executeCommand(command)
      .then(response => {
        console.log('OK');
      }).catch(error => {
      console.log('ERROR');
    });
  }

  function streamToggleHandler() {
    let command = {
      droneId: props.selectedDroneId,
      name: isStreaming ? STREAM_OFF : STREAM_ON,
      params: []
    }

    setStreaming(!isStreaming);

    if (!isCommandValid(command)) {
      return;
    }
    executeCommand(command)
      .then(response => {
        console.log('OK');
      }).catch(error => {
      console.log('ERROR');
    });
  }

  function emergencyClickHandler() {
    let command = {
      droneId: props.selectedDroneId,
      name: EMERGENCY,
      params: []
    }

    if (!isCommandValid(command)) {
      return;
    }
    executeCommand(command)
      .then(response => {
        console.log('OK');
      }).catch(error => {
      console.log('ERROR');
    });
  }

  function forwardFlipHandler() {
    let command = {
      droneId: props.selectedDroneId,
      name: FLIP,
      params: [FLIP_FORWARD]
    }

    if (!isCommandValid(command)) {
      return;
    }
    executeCommand(command)
      .then(response => {
        if (!response) {
          props.displayExecuteError();
        }
      }).catch(error => {
      console.log('ERROR');
    });
  }

  function rightFlipHandler() {
    let command = {
      droneId: props.selectedDroneId,
      name: FLIP,
      params: [FLIP_RIGHT]
    }

    if (!isCommandValid(command)) {
      return;
    }
    executeCommand(command)
      .then(response => {
        if (!response) {
          props.displayExecuteError();
        }
      }).catch(error => {
      console.log('ERROR');
    });
  }

  function leftFlipHandler() {
    let command = {
      droneId: props.selectedDroneId,
      name: FLIP,
      params: [FLIP_LEFT]
    }

    if (!isCommandValid(command)) {
      return;
    }
    executeCommand(command)
      .then(response => {
        if (!response) {
          props.displayExecuteError();
        }
      }).catch(error => {
      console.log('ERROR');
    });
  }

  function backFlipHandler() {
    let command = {
      droneId: props.selectedDroneId,
      name: FLIP,
      params: [FLIP_BACK]
    }

    if (!isCommandValid(command)) {
      return;
    }
    executeCommand(command)
      .then(response => {
        if (!response) {
          props.displayExecuteError();
        }
      }).catch(error => {
      console.log('ERROR');
    });
  }

  return (
    <div className="command-header">
      <div className="command-header__general-container">
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
      <div className="command-header__flip-container">
        <div className="command-header__flip-container__title">Flip</div>
        <div className="command-header__flip-container__item" onClick={forwardFlipHandler}>
          Forward
        </div>
        <div className="command-header__flip-container__item" onClick={rightFlipHandler}>
          Right
        </div>
        <div className="command-header__flip-container__item" onClick={backFlipHandler}>
          Back
        </div>
        <div className="command-header__flip-container__item" onClick={leftFlipHandler}>
          Left
        </div>
      </div>
    </div>
  )
}

export default CommandHeader

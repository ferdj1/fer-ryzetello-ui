import * as React from "react"
import "./CommandHeader.scss";
import {executeCommand} from "../../apiClient/CommandService";
import {
  BACK,
  EMERGENCY, FLIP,
  FORWARD,
  LAND,
  LEFT,
  RIGHT, STOP,
  STREAM_OFF,
  STREAM_ON,
  TAKEOFF,
  UP
} from "../../constants/CommandConstants";
import {
  DEFAULT_DISTANCE, DEFAULT_TURN_DEGREES,
  FLIP_BACK,
  FLIP_FORWARD,
  FLIP_LEFT,
  FLIP_RIGHT
} from "../../constants/CommandParameterDefaults";
import {useState} from "react";
import {
  AiFillStop,
  BsFillExclamationOctagonFill,
  FaVideo,
  FaVideoSlash,
  RiFlightLandFill,
  RiFlightTakeoffFill
} from "react-icons/all";
import {isCommandValid} from "../../validator/CommandValidator";
import {Slider} from "@material-ui/core";

function CommandHeader(props) {

  function flyingToggleHandler() {
    let command = {
      droneId: props.droneId,
      name: props.isFlying ? LAND : TAKEOFF,
      params: []
    }

    props.setFlying(!props.isFlying);

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
      droneId: props.droneId,
      name: props.isStreaming ? STREAM_OFF : STREAM_ON,
      params: []
    }

    props.setStreaming(!props.isStreaming);

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
      droneId: props.droneId,
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

  function stopClickHandler() {
    let command = {
      droneId: props.droneId,
      name: STOP,
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
      droneId: props.droneId,
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
      droneId: props.droneId,
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
      droneId: props.droneId,
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
      droneId: props.droneId,
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

  const handleDistanceChange = (event, newValue) => {
    props.setDistance(newValue);
  };


  const handleDegreesChange = (event, newValue) => {
    props.setDegrees(newValue);
  };

  return (
    <div className="command-header">
      <div className="command-header__general-container">
        <div className="command-header__item" onClick={flyingToggleHandler}>
          {props.isFlying ? <RiFlightLandFill/>: <RiFlightTakeoffFill/>}
        </div>
        <div className="command-header__item" onClick={streamToggleHandler}>
          {props.isStreaming ? <FaVideoSlash/>: <FaVideo/>}
        </div>
        <div className="command-header__item" onClick={emergencyClickHandler}>
          <BsFillExclamationOctagonFill />
        </div>
        <div className="command-header__item" onClick={stopClickHandler}>
          <AiFillStop />
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
      <div className="command-header__slider-container">
        <div className="command-header__slider-container__slider-distance">
          <div className="command-header__slider-container__slider-distance__desc">
            <span>Distance</span>
            <span className="command-header__slider-container__slider-distance__desc__value">{props.distance} cm</span>
          </div>
          <Slider
            value={props.distance}
            onChange={handleDistanceChange}
            min={props.lowLight ? -100 : 20}
            max={props.lowLight ? 100 : 500}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
          />
        </div>
        <div className="command-header__slider-container__slider-degrees">
          <div className="command-header__slider-container__slider-degrees__desc">
            <span>Degrees</span>
            <span className="command-header__slider-container__slider-degrees__desc__value">{props.degrees}°</span>
          </div>
          <Slider
            value={props.degrees}
            onChange={handleDegreesChange}
            min={1}
            max={360}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
          />
        </div>
      </div>
    </div>
  )
}

export default CommandHeader

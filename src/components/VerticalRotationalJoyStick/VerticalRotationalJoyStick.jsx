import * as React from "react"
import JoyStick from "../JoyStick/JoyStick";
import "./VerticalRotationalJoyStick.scss";
import {HiFastForward, TiArrowLoop} from "react-icons/all";
import {executeCommand} from "../../apiClient/CommandService";
import {CCW, CW, DOWN, RC, UP} from "../../constants/CommandConstants";
import {DEFAULT_DISTANCE, DEFAULT_TURN_DEGREES} from "../../constants/CommandParameterDefaults";
import {isCommandValid} from "../../validator/CommandValidator";

function VerticalRotationalJoyStick(props) {
  function topClickHandler() {
    let command;
    if (props.lowLight) {
      command = {
        droneId: props.selectedDroneId,
        name: RC,
        params: [0, 0, DEFAULT_DISTANCE, 0]
      }
    } else {
      command = {
        droneId: props.selectedDroneId,
        name: UP,
        params: [DEFAULT_DISTANCE]
      }
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

  function rightClickHandler() {
    let command = {
      droneId: props.selectedDroneId,
      name: CW,
      params: [DEFAULT_TURN_DEGREES]
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

  function leftClickHandler() {
    let command = {
      droneId: props.selectedDroneId,
      name: CCW,
      params: [DEFAULT_TURN_DEGREES]
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

  function bottomClickHandler() {
    let command;
    if (props.lowLight) {
      command = {
        droneId: props.selectedDroneId,
        name: RC,
        params: [0, 0, '-'+DEFAULT_DISTANCE, 0]
      }
    } else {
      command = {
        droneId: props.selectedDroneId,
        name: DOWN,
        params: [DEFAULT_DISTANCE]
      }
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

  function centerClickHandler() {
    console.log('Center command not set.');
  }

  return (
    <JoyStick topIcon={<HiFastForward className="rotate-ccw-90"/>}
              rightIcon={<TiArrowLoop className="flip-horizontal"/>}
              leftIcon={<TiArrowLoop/>}
              bottomIcon={<HiFastForward className="rotate-cw-90"/>}
              topClickHandler={topClickHandler}
              rightClickHandler={rightClickHandler}
              leftClickHandler={leftClickHandler}
              bottomClickHandler={bottomClickHandler}
              centerClickHandler={centerClickHandler}
    />
  )
}

export default VerticalRotationalJoyStick

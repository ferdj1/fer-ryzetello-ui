import * as React from "react"
import JoyStick from "../JoyStick/JoyStick";
import "./FlatPlaneJoyStick.scss";
import {IoMdArrowRoundBack,
  IoMdArrowRoundDown, IoMdArrowRoundForward, IoMdArrowRoundUp
} from "react-icons/all";
import {executeCommand} from "../../apiClient/CommandService";
import {BACK, FORWARD, LEFT, RC, RIGHT, UP} from "../../constants/CommandConstants";
import {DEFAULT_DISTANCE} from "../../constants/CommandParameterDefaults";
import {isCommandValid} from "../../validator/CommandValidator";

function FlatPlaneJoyStick(props) {
  function topClickHandler() {
    let command;
    if (props.lowLight) {
      command = {
        droneId: props.selectedDroneId,
        name: RC,
        params: [0, DEFAULT_DISTANCE, 0, 0]
      }
    } else {
      command = {
        droneId: props.selectedDroneId,
        name: FORWARD,
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
    let command;
    if (props.lowLight) {
      command = {
        droneId: props.selectedDroneId,
        name: RC,
        params: [DEFAULT_DISTANCE, 0, 0, 0]
      }
    } else {
      command = {
        droneId: props.selectedDroneId,
        name: RIGHT,
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

  function leftClickHandler() {
    let command;
    if (props.lowLight) {
      command = {
        droneId: props.selectedDroneId,
        name: RC,
        params: ['-'+DEFAULT_DISTANCE, 0, 0, 0]
      }
    } else {
      command = {
        droneId: props.selectedDroneId,
        name: LEFT,
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

  function bottomClickHandler() {
    let command;
    if (props.lowLight) {
      command = {
        droneId: props.selectedDroneId,
        name: RC,
        params: [0, '-'+DEFAULT_DISTANCE, 0, 0]
      }
    } else {
      command = {
        droneId: props.selectedDroneId,
        name: BACK,
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
    <JoyStick topIcon={<IoMdArrowRoundUp />}
              rightIcon={<IoMdArrowRoundForward />}
              leftIcon={<IoMdArrowRoundBack />}
              bottomIcon={<IoMdArrowRoundDown />}
              topClickHandler={topClickHandler}
              rightClickHandler={rightClickHandler}
              leftClickHandler={leftClickHandler}
              bottomClickHandler={bottomClickHandler}
              centerClickHandler={centerClickHandler}
    />
  )
}

export default FlatPlaneJoyStick

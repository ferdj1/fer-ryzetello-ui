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
        droneId: props.droneId,
        name: RC,
        params: [0, props.distance, 0, 0]
      }
    } else {
      command = {
        droneId: props.droneId,
        name: FORWARD,
        params: [props.distance]
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
        droneId: props.droneId,
        name: RC,
        params: [props.distance, 0, 0, 0]
      }
    } else {
      command = {
        droneId: props.droneId,
        name: RIGHT,
        params: [props.distance]
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
        droneId: props.droneId,
        name: RC,
        params: ['-'+props.distance, 0, 0, 0]
      }
    } else {
      command = {
        droneId: props.droneId,
        name: LEFT,
        params: [props.distance]
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
        droneId: props.droneId,
        name: RC,
        params: [0, '-'+props.distance, 0, 0]
      }
    } else {
      command = {
        droneId: props.droneId,
        name: BACK,
        params: [props.distance]
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

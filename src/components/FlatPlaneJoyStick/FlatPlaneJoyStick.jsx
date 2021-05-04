import * as React from "react"
import JoyStick from "../JoyStick/JoyStick";
import "./FlatPlaneJoyStick.scss";
import {IoMdArrowRoundBack,
  IoMdArrowRoundDown, IoMdArrowRoundForward, IoMdArrowRoundUp
} from "react-icons/all";
import {executeCommand} from "../../apiClient/CommandService";
import {BACK, FORWARD, LEFT, RIGHT, UP} from "../../constants/CommandConstants";
import {DEFAULT_DISTANCE} from "../../constants/CommandParameterDefaults";

function FlatPlaneJoyStick(props) {
  function topClickHandler() {
    let command = {
      droneId: props.selectedDroneId,
      name: FORWARD,
      params: [DEFAULT_DISTANCE]
    }

    executeCommand(command)
      .then(response => {
        console.log('OK');
      }).catch(error => {
      console.log('ERROR');
    });
  }

  function rightClickHandler() {
    let command = {
      droneId: props.selectedDroneId,
      name: RIGHT,
      params: [DEFAULT_DISTANCE]
    }

    executeCommand(command)
      .then(response => {
        console.log('OK');
      }).catch(error => {
      console.log('ERROR');
    });
  }

  function leftClickHandler() {
    let command = {
      droneId: props.selectedDroneId,
      name: LEFT,
      params: [DEFAULT_DISTANCE]
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
      droneId: props.selectedDroneId,
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

import * as React from "react"
import JoyStick from "../JoyStick/JoyStick";
import "./FlipJoyStick.scss";
import {
  IoMdArrowRoundBack,
  IoMdArrowRoundDown, IoMdArrowRoundForward, IoMdArrowRoundUp, IoRefreshOutline, RiArrowGoForwardFill
} from "react-icons/all";
import {executeCommand} from "../../apiClient/CommandService";
import {BACK, FLIP, FORWARD, LEFT, RIGHT, UP} from "../../constants/CommandConstants";
import {
  DEFAULT_DISTANCE,
  FLIP_BACK,
  FLIP_FORWARD,
  FLIP_LEFT,
  FLIP_RIGHT
} from "../../constants/CommandParameterDefaults";

function FlipJoyStick(props) {
  function topClickHandler() {
    let command = {
      name: FLIP,
      params: [FLIP_FORWARD]
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
      name: FLIP,
      params: [FLIP_RIGHT]
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
      name: FLIP,
      params: [FLIP_LEFT]
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
      name: FLIP,
      params: [FLIP_BACK]
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
    <JoyStick topIcon={<IoRefreshOutline className="rotate-1"/>}
              rightIcon={<IoRefreshOutline className="rotate-3" />}
              leftIcon={<IoRefreshOutline className="rotate-4" />}
              bottomIcon={<IoRefreshOutline className="rotate-2" />}
              topClickHandler={topClickHandler}
              rightClickHandler={rightClickHandler}
              leftClickHandler={leftClickHandler}
              bottomClickHandler={bottomClickHandler}
              centerClickHandler={centerClickHandler}
    />
  )
}

export default FlipJoyStick

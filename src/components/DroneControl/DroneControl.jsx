import * as React from "react"
import "./DroneControl.scss";
import CommandHeader from "../CommandHeader/CommandHeader";
import VerticalRotationalJoyStick from "../VerticalRotationalJoyStick/VerticalRotationalJoyStick";
import {FaVideoSlash} from "react-icons/all";
import JsmpegPlayer from "../JsmpegPlayer/JsmpegPlayer";
import FlatPlaneJoyStick from "../FlatPlaneJoyStick/FlatPlaneJoyStick";
import {useEffect, useState} from "react";
import {getWebSocketPort} from "../../apiClient/DronePortService";
import {useToast} from "@chakra-ui/react";
import {DEFAULT_DISTANCE, DEFAULT_TURN_DEGREES} from "../../constants/CommandParameterDefaults";
import {RT_HOST} from "../../constants/ApiConstants";

function DroneControl(props) {

  const [streamWsPort, setStreamWsPort] = useState(null);

  const [isFlying, setFlying] = useState(false);
  const [isStreaming, setStreaming] = useState(false);

  const [distance, setDistance] = useState(DEFAULT_DISTANCE);
  const [degrees, setDegrees] = useState(DEFAULT_TURN_DEGREES);

  const toast = useToast();

  const videoOptions = {
    poster: 'https://cycjimmy.github.io/staticFiles/images/screenshot/big_buck_bunny_640x360.jpg'
  };

  const videoOverlayOptions = {autoplay: true};

  let jsmpegPlayer = null;

  useEffect(() => {
    if (props.droneId) {
      loadWebSocketPort(props.droneId);
    }
  }, [props.droneId]);

  function loadWebSocketPort(id) {
    getWebSocketPort(id).then(response => {
      setStreamWsPort(response);
    }).catch(error => {
      toast({
        title: "Error",
        description: (error && error.error) || 'Oops! Something went wrong. Please try again!',
        status: "error",
        duration: 5000,
        isClosable: true
      })
    })
  }

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
    <div className="drone-control">
      <CommandHeader droneId={props.droneId}
                     isFlying={isFlying} setFlying={setFlying}
                     isStreaming={isStreaming} setStreaming={setStreaming}
                     distance={distance} setDistance={setDistance}
                     degrees={degrees} setDegrees={setDegrees}
                     lowLight={props.lowLight}/>
      <div className="homepage__joysticks-stream">
        <VerticalRotationalJoyStick droneId={props.droneId} displayExecuteError={displayExecuteError}
                                    lowLight={props.lowLight} distance={distance} degrees={degrees}/>
        {!isStreaming ? <div className="homepage__joysticks-stream__stream">
            <FaVideoSlash className="homepage__joysticks-stream__stream__icon"/>
          </div> :
          <div className="homepage__joysticks-stream__stream--active">
            {streamWsPort && <JsmpegPlayer
              wrapperClassName="video-wrapper"
              videoUrl={"ws://" + RT_HOST + ":" + streamWsPort}
              //videoUrl={"ws://127.0.0.1:" + 8082}
              options={videoOptions}
              overlayOptions={videoOverlayOptions}
              onRef={ref => jsmpegPlayer = ref}
            />}
          </div>
        }
        <FlatPlaneJoyStick droneId={props.droneId} displayExecuteError={displayExecuteError}
                           lowLight={props.lowLight} distance={distance} degrees={degrees}/>
      </div>
    </div>
  )
}

export default DroneControl

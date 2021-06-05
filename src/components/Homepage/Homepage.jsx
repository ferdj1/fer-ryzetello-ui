import * as React from "react"
import FlatPlaneJoyStick from "../FlatPlaneJoyStick/FlatPlaneJoyStick";
import VerticalRotationalJoyStick from "../VerticalRotationalJoyStick/VerticalRotationalJoyStick";
import CommandHeader from "../CommandHeader/CommandHeader";
import DroneSelector from "../DroneSelector/DroneSelector";
import {useToast} from "@chakra-ui/react";
import {FaVideoSlash} from "react-icons/all";
import JsmpegPlayer from "../JsmpegPlayer/JsmpegPlayer";
import "./Homepage.scss";
import {useEffect, useState} from "react";
import {getWebSocketPort} from "../../apiClient/DronePortService";

function Homepage(props) {

  const [streamWsPort, setStreamWsPort] = useState(null);

  const toast = useToast();

  const videoOptions = {
    poster: 'https://cycjimmy.github.io/staticFiles/images/screenshot/big_buck_bunny_640x360.jpg'
  };

  const videoOverlayOptions = {autoplay: true};

  let jsmpegPlayer = null;

  useEffect(() => {
    if (props.selectedDroneId) {
      loadWebSocketPort(props.selectedDroneId);
    }
  }, [props.selectedDroneId]);

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
    <div className="homepage">
      <DroneSelector droneIds={props.droneIds} setSelectedDroneId={props.setSelectedDroneId}/>
      {props.selectedDroneId && <>
        <CommandHeader selectedDroneId={props.selectedDroneId}/>
        <div className="homepage__joysticks-stream">
          <VerticalRotationalJoyStick selectedDroneId={props.selectedDroneId} displayExecuteError={displayExecuteError}
                                      lowLight={props.lowLight}/>
          {false ? <div className="homepage__joysticks-stream__stream">
              <FaVideoSlash className="homepage__joysticks-stream__stream__icon"/>
            </div> :
            <div className="homepage__joysticks-stream__stream--active">
              {streamWsPort && <JsmpegPlayer
                wrapperClassName="video-wrapper"
                videoUrl={"ws://127.0.0.1:" + streamWsPort}
                //videoUrl={"ws://127.0.0.1:" + 8082}
                options={videoOptions}
                overlayOptions={videoOverlayOptions}
                onRef={ref => jsmpegPlayer = ref}
              />}
            </div>
          }
          <FlatPlaneJoyStick selectedDroneId={props.selectedDroneId} displayExecuteError={displayExecuteError}
                             lowLight={props.lowLight}/>
        </div>
      </>}
    </div>
  )
}

export default Homepage

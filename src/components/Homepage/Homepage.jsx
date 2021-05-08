import * as React from "react"
import FlatPlaneJoyStick from "../FlatPlaneJoyStick/FlatPlaneJoyStick";
import VerticalRotationalJoyStick from "../VerticalRotationalJoyStick/VerticalRotationalJoyStick";
import CommandHeader from "../CommandHeader/CommandHeader";
import FlipJoyStick from "../FlipJoyStick/FlipJoyStick";
import DroneSelector from "../DroneSelector/DroneSelector";
import "./Homepage.scss";
import {useEffect, useState} from "react";
import {getAllDrones} from "../../apiClient/DroneService";
import {useToast} from "@chakra-ui/react";

function Homepage(props) {
  const [drones, setDrones] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [selectedDroneId, setSelectedDroneId] = useState(null);

  const toast = useToast();

  useEffect(() => {
    loadAllDrones();
  }, []);

  function loadAllDrones() {
    setLoaded(false);
    getAllDrones().then(response => {
      setDrones(response);
      setLoaded(true);
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
      <DroneSelector drones={drones} setSelectedDroneId={setSelectedDroneId}/>
      { selectedDroneId && <>
        <CommandHeader selectedDroneId={selectedDroneId}/>
        <div className="homepage__joysticks">
          <VerticalRotationalJoyStick selectedDroneId={selectedDroneId} displayExecuteError={displayExecuteError}/>
          <FlatPlaneJoyStick selectedDroneId={selectedDroneId} displayExecuteError={displayExecuteError}/>
          <FlipJoyStick selectedDroneId={selectedDroneId} displayExecuteError={displayExecuteError}/>
        </div>
      </>}
    </div>
  )
}

export default Homepage

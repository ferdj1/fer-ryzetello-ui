import * as React from "react"

import Header from "./components/Header/Header";
import {ChakraProvider, useToast} from "@chakra-ui/react";

import './App.css';
import {Route, Switch} from "react-router";
import Homepage from "./components/Homepage/Homepage";
import {BACKEND_URL} from "./constants/ApiConstants";
import {handleWebsocketMessage} from "./websocket/websocket";
import StompJsClient from 'react-stomp';
import {useEffect, useState} from "react";
import {getAllDroneIds, getAllDrones} from "./apiClient/DroneService";
import DroneControl from "./components/DroneControl/DroneControl";

function App() {
  const [droneIds, setDroneIds] = useState([]);
  const [droneControls, setDroneControls] = useState(new Map());
  const [loaded, setLoaded] = useState(false);
  const [lowLight, setLowLight] = useState(false);

  const [selectedDroneId, setSelectedDroneId] = useState(null);
  const [currentDroneControl, setCurrentDroneControl] = useState(null);

  const toast = useToast();

  useEffect(() => {
    loadAllDrones();

    let droneControlsMap = new Map();
    droneIds.forEach(droneId => {
      droneControlsMap.set(droneId, <DroneControl droneId={droneId} lowLight={false}/>);
    })

    setDroneControls(droneControlsMap);
  }, []);

  useEffect(() => {
    setCurrentDroneControl(droneControls.get(selectedDroneId));
  }, [droneControls, selectedDroneId]);

  function loadAllDrones() {
    setLoaded(false);
    getAllDroneIds().then(response => {
      setDroneIds(response);
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

  function handleWebsocketMessage(message) {
    switch(message.type) {
      case 'DRONES_ADDED':
        console.log('DRONES_ADDED');
        let addedDroneIds = message.data;
        setDroneIds([...droneIds, ...addedDroneIds]);
        addedDroneIds.forEach(droneId => droneControls.set(droneId, <DroneControl droneId={droneId} selectedDroneId={selectedDroneId} lowLight={false}/>));
        break;
      case 'DRONES_REMOVED':
        console.log('DRONES_REMOVED');
        let removedDroneIds = message.data;
        setDroneIds(droneIds.filter(droneId => !removedDroneIds.includes(droneId)));
        removedDroneIds.forEach(droneId => droneControls.delete(droneId));

        if (removedDroneIds.includes(selectedDroneId)) {
          setSelectedDroneId("");
          setCurrentDroneControl(null);
        }

        break;
    }
  }

  return (
    <ChakraProvider>
      <Header lowLight={false} setLowLight={setLowLight}/>
      <Switch>
        <Route exact path="/" render={(props) => <Homepage {...props} droneIds={droneIds} selectedDroneId={selectedDroneId} setSelectedDroneId={setSelectedDroneId} currentDroneControl={currentDroneControl} lowLight={false}/>}/>
      </Switch>
      <StompJsClient url={BACKEND_URL + '/ws'} topics={['/queue/drones']} onMessage={(msg) => handleWebsocketMessage(msg)}/>
    </ChakraProvider>
  );
}

export default App;

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

function App() {
  const [droneIds, setDroneIds] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const [selectedDroneId, setSelectedDroneId] = useState(null);

  const toast = useToast();

  useEffect(() => {
    loadAllDrones();
  }, []);

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
        break;
      case 'DRONES_REMOVED':
        console.log('DRONES_REMOVED');
        let removedDroneIds = message.data;
        setDroneIds(droneIds.filter(droneId => !removedDroneIds.includes(droneId)));

        if (removedDroneIds.includes(selectedDroneId)) {
          setSelectedDroneId("");
        }

        break;
    }
  }

  return (
    <ChakraProvider>
      <Header/>
      <Switch>
        <Route exact path="/" render={(props) => <Homepage {...props} droneIds={droneIds} selectedDroneId={selectedDroneId} setSelectedDroneId={setSelectedDroneId}/>}/>
      </Switch>
      <StompJsClient url={BACKEND_URL + '/ws'} topics={['/queue/drones']} onMessage={(msg) => handleWebsocketMessage(msg)}/>
    </ChakraProvider>
  );
}

export default App;

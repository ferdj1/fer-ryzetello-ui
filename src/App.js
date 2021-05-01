import * as React from "react"

import Header from "./components/Header/Header";
import {ChakraProvider} from "@chakra-ui/react";

import './App.css';
import {Route, Switch} from "react-router";
import Homepage from "./components/Homepage/Homepage";

function App() {
  return (
    <ChakraProvider>
      <Header/>
      <Switch>
        <Route exact path="/" render={(props) => <Homepage {...props} />}/>
      </Switch>

    </ChakraProvider>
  );
}

export default App;

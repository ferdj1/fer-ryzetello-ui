import * as React from "react"
import {Select} from "@chakra-ui/react";
import "./DroneSelector.scss";

function DroneSelector(props) {
  function handleChange(event) {
    props.setSelectedDroneId(event.target.value);
  }

  return (
    <div className="drone-selector">
      <Select placeholder="Select drone" size="md" onChange={handleChange}>
        {
          props.drones.map((drone, i) => <option value={drone.id}>{drone.id}</option>)
        }
      </Select>
    </div>
  )
}

export default DroneSelector

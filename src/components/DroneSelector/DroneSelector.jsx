import * as React from "react"
import {Select} from "@chakra-ui/react";
import "./DroneSelector.scss";

function DroneSelector(props) {
  function handleChange(event) {
    props.setSelectedDroneId(event.target.value);
  }

  return (
    <div className="drone-selector">
      <Select className="drone-selector__select" placeholder="Select drone" size="md" bg="#ffffff" borderColor="#ffffff" onChange={handleChange}>
        {
          props.droneIds.map((droneId, i) => <option value={droneId}>{droneId}</option>)
        }
      </Select>
    </div>
  )
}

export default DroneSelector

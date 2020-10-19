import React from "react";
import Graph from "./Graph";

class Charts extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <h1>Charts</h1>
        <div className="row">
          <Graph title="Temperature" type="success" id="temperature" />
          <Graph title="Pressure" type="warning" id="pressure" />
          <Graph title="Humidity" type="danger" id="humidity" />
        </div>
      </>
    );
  }
}

export default Charts;

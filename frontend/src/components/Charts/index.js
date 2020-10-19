import React from "react";
import Graph from "./Graph";

const data = [
  {
    color: "#f6cdc7",
    eco2: 1497,
    heading: "80.00",
    humidity: 37,
    pressure: 1362,
    temperature: 1362,
  },
  {
    color: "#aab0d0",
    eco2: 708,
    heading: "91.00",
    humidity: 34,
    pressure: 665,
    temperature: 665,
  },
  {
    color: "#fb4710",
    eco2: 681,
    heading: "8.00",
    humidity: 24,
    pressure: 999,
    temperature: 999,
  },
  {
    color: "#435ffc",
    eco2: 452,
    heading: "210.00",
    humidity: 34,
    pressure: 1297,
    temperature: 1297,
  },
  {
    color: "#6217a9",
    eco2: 1011,
    heading: "348.00",
    humidity: 29,
    pressure: 637,
    temperature: 637,
  },
];

class Charts extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <h1>Charts</h1>
        <div className="row">
          <Graph id="temperature1" data={data} type="success" />
          <Graph id="temperature2" data={data} type="warning" />
          <Graph id="temperature3" data={data} type="danger" />
        </div>
      </>
    );
  }
}

export default Charts;

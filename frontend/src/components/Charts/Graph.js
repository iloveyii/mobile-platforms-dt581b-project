import React from "react";

export default class Graph extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.drawChart();
  }

  drawChart = () => {
    const { data, id } = this.props;
    console.log("Chart", data, id);
    const elementId = id;
    const d = data;
    let labels = ["time"];

    window.d = d;
    let max = 0;
    var series0 = [];
    d.forEach((data) => {
      max = max > data[elementId] ? max : data[elementId];
      series0.push(data[elementId]);
      labels.push(data[elementId]);
    });
    var series = [series0];
    const dataTemperatureChart = {
      labels: labels,
      series: series,
    };

    const optionsTemperatureChart = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0,
      }),
      low: 0,
      high: max + 10, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
      showArea: true,
      showLine: false,
      showPoint: false,
      fullWidth: true,
    };

    var ds = new Chartist.Line(
      "#" + elementId + "Chart",
      dataTemperatureChart,
      optionsTemperatureChart
    );
    let historySeries = [];
  };

  render() {
    const { type, id } = this.props;
    return (
      <div className="col-md-4">
        <div className="card card-chart">
          <div className={"card-header card-header-" + type}>
            <div className="ct-chart" id={id + "Chart"}></div>
          </div>
          <div className="card-body">
            <h4 className="card-title">Temperature</h4>
            <p className="card-category">
              <span className={"text-" + type} style={{ fontSize: "30px" }}>
                <i className="fa fa-thermometer-half" aria-hidden="true"></i>
                <span id={id}></span>
              </span>
            </p>
          </div>
          <div className="card-footer">
            <div className="stats">
              <i className="material-icons">access_time</i> Updating
            </div>
          </div>
        </div>
      </div>
    );
  }
}

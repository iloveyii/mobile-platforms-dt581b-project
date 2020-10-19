import React from "react";

export default function Graph() {
  return (
    <div className="col-md-4">
      <div className="card card-chart">
        <div className={"card-header card-header-success"}>
          <div className="ct-chart" id="temperatureChart"></div>
        </div>
        <div className="card-body">
          <h4 className="card-title">Temperature</h4>
          <p className="card-category">
            <span className={"text-success"} style={{ fontSize: "30px" }}>
              <i className="fa fa-thermometer-half" aria-hidden="true"></i>
              <span id="temperature"></span>
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

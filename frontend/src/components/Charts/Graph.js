import React, { useEffect } from "react";
import { drawChart, data } from "./functions";

export default function Graph({ id, type, title }) {
  useEffect(() => {
    drawChart(id, data, title);
  }, []);

  return (
    <div className="col-md-4">
      <div className="card card-chart">
        <div className={"card-header card-header-" + type}>
          <div className="ct-chart" id={id + "Chart"}></div>
        </div>
        <div className="card-body">
          <h4 className="card-title">{title}</h4>
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

import React, { useEffect } from "react";
import { drawChart, data, chartMultiLine, chartBar } from "./functions";

export default function Table({ id, type, title, data, dataLength }) {
  useEffect(() => {
    switch (id) {
      case "barChart":
        chartBar("barChart", data);
        break;
      case "multilineChart":
        console.log("formatData", data, dataLength);
        chartMultiLine("multilineChart", data);
        break;
    }
  }, [data]);
  return (
    <div className="col-lg-6 col-md-6">
      <div className="card">
        <div className={"card-header card-header-" + type}>
          <h4 className="card-title">{title}</h4>
        </div>
        <div className="card-body table-responsive">
          <div id={id}></div>
        </div>
      </div>
    </div>
  );
}

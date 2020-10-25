import React, { useEffect } from "react";
import { drawChart, data, chartMultiLine, chartBar } from "./functions";

export default function Table({ id, type, title }) {
  useEffect(() => {
    switch (id) {
      case "barChart":
        chartBar("barChart", undefined);
        break;
      case "multilineChart":
        chartMultiLine("multilineChart", undefined);
        break;
    }
  }, []);
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

import React from "react";

export default function Stats({ type, icon, title, data, subtitle, subicon }) {
  return (
    <div className="col-lg-3 col-md-6 col-sm-6">
      <div className="card card-stats">
        <div className={"card-header card-header-icon card-header-" + type}>
          <div className="card-icon">
            <i className={"fa " + icon} aria-hidden="true"></i>
          </div>
          <p className="card-category">{title}</p>
          <h3 className="card-title" id={title}>
            <small>
              {" " +
                (data && data.onTime
                  ? new Date(data.onTime * 1000).toISOString().substr(11, 8)
                  : "")}
            </small>
          </h3>
        </div>
        <div className="card-footer">
          <div className="stats">
            <i className={"material-icons text-" + type}>{subicon}</i>
            {subtitle}
          </div>
        </div>
      </div>
    </div>
  );
}

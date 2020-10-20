import React from "react";

export default function Table({ type, title }) {
  return (
    <div className="col-lg-6 col-md-6">
      <div className="card">
        <div className={"card-header card-header-" + type}>
          <h4 className="card-title">{title}</h4>
        </div>
        <div className="card-body table-responsive">
          <tr>
            <td>
              <img id="live-image" src="" alt="Live video" />
            </td>
            <td>
              <span id="live-image-status"></span>
            </td>
          </tr>
        </div>
      </div>
    </div>
  );
}

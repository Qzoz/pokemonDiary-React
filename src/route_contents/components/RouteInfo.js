import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./RouteInfo.scss";

class RouteInfo extends Component {
  render() {
    if (!this.props.fullPath) return null;
    const pathList = this.props.fullPath.split("/");
    return (
      <div className="route-info">
        <p>
          {pathList.length
            ? pathList.map((value, index) => {
                if (value === "") return null;
                if (index === pathList.length - 1)
                  return (
                    <span
                      key={`key-${index}-${value}`}
                      className="path-tree-link active-link"
                    >
                      {value}
                    </span>
                  );
                return (
                  <Link
                    key={`key-${index}-${value}`}
                    to={`${pathList.slice(0, index + 1).join("/")}`}
                    className="path-tree-link"
                  >
                    {value}
                  </Link>
                );
              })
            : null}
        </p>
      </div>
    );
  }
}

export default RouteInfo;

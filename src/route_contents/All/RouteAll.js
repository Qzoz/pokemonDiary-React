import React, { Component, Fragment } from "react";
import "./RouteAll.scss";
import AllPage from "./AllPage";
import RouteInfo from "../components/RouteInfo";

class RouteAll extends Component {
  render() {
    return (
      <Fragment>
        <RouteInfo fullPath={this.props.match.url} />
        <AllPage />
      </Fragment>
    );
  }
}

export default RouteAll;

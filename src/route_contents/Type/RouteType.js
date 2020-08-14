import React, { Component, Fragment } from "react";
import TypePage from "./TypePage";
import "./RouteType.scss";
import RouteInfo from "../components/RouteInfo";

class RouteType extends Component {
  render() {
    return (
      <Fragment>
        <RouteInfo fullPath={this.props.match.url} />
        <TypePage />
      </Fragment>
    );
  }
}

export default RouteType;

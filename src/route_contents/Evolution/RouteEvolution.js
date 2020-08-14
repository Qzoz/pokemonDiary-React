import React, { Component, Fragment } from "react";
import RouteInfo from "../components/RouteInfo";
import EvolutionPage from "./EvolutionPage";

class RouteEvolution extends Component {
  render() {
    return (
      <Fragment>
        <RouteInfo fullPath={this.props.match.url} />
        <EvolutionPage />
      </Fragment>
    );
  }
}

export default RouteEvolution;

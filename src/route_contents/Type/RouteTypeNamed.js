import React, { Component, Fragment } from "react";
import RouteInfo from "../components/RouteInfo";
import TypeNpage from "./TypeNpage";
import './RouteType.scss';

class RouteTypeNamed extends Component {
  render() {
    return (
      <Fragment>
        <RouteInfo fullPath={this.props.match.url} />
        <TypeNpage typeName={this.props.match.params.type}/>
      </Fragment>
    );
  }
}

export default RouteTypeNamed;

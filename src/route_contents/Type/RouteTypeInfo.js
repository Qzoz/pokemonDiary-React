import React, { Component, Fragment } from "react";
import RouteInfo from "../components/RouteInfo";
import TypeInfoCards from "../../poke_components/type_info/TypeInfoCards";

class RouteTypeInfo extends Component {
  render() {
    return (
      <Fragment>
        <RouteInfo fullPath={this.props.match.url} />
        <div className="poke-type-info-container">
          <TypeInfoCards type={this.props.match.params.type} />
        </div>
      </Fragment>
    );
  }
}

export default RouteTypeInfo;

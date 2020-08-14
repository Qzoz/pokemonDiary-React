import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";

class PortalContents extends Component {
  render() {
    return ReactDOM.createPortal(
      <Fragment>{this.props.children}</Fragment>,
      document.getElementById("portal-root")
    );
  }
}

export default PortalContents;

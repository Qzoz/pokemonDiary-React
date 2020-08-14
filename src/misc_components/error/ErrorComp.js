import React, { Component } from "react";
import FontAwesomeIcon from "../../FontAwesome";

class ErrorComp extends Component {
  render() {
    return (
      <div className={`poke-error-container ${this.props.className}`}>
        <h2 className="poke-error-elem">
          {this.props.errorText ? this.props.errorText : "Oho"}
          <FontAwesomeIcon
            className="poke-error-icon"
            icon={["fas", "exclamation"]}
          />
        </h2>
        <p className="poke-error-box">
          {this.props.errorMsg}
          {this.props.children}
        </p>
      </div>
    );
  }
}

export default ErrorComp;

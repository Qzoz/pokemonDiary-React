import React, { Component, Fragment } from "react";
import ErrorComp from "./ErrorComp";
import "./OnError.scss";
import Retry from "./Retry";

class OnError extends Component {
  render() {
    const optToRetry = this.props.showRetry ? true : false;
    const onRetry = this.props.onRetry
      ? this.props.onRetry
      : () => {
          console.log("No Callback Offered");
        };
    const errorMsg = this.props.errorMsg
      ? this.props.errorMsg
      : "Check Your Internet Connection";
    if (this.props.showError === false) return null;
    return (
      <Fragment>
        <ErrorComp
          errorText={this.props.errorText}
          errorMsg={errorMsg}
          className={optToRetry ? "" : "if-no-retry"}
        >
          {this.props.children}
        </ErrorComp>
        {optToRetry ? (
          <Retry onRetry={onRetry} retryMsg={this.props.retryMsg} />
        ) : null}
      </Fragment>
    );
  }
}

export default OnError;

import React, { Component } from "react";

class Retry extends Component {
  render() {
    const retryMsg = this.props.retryMsg
      ? this.props.retryMsg
      : "Don't Stop Trying. Try and try until you Succeed";
    return (
      <div className="poke-retry-container">
        <div>
          <p>{retryMsg}</p>
        </div>
        <div>
          <button className="poke-retry-btn" onClick={this.props.onRetry}>
            Click To Retry
          </button>
        </div>
      </div>
    );
  }
}

export default Retry;

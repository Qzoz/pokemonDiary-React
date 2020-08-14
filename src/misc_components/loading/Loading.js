import React, { Component } from "react";
import "./Loading.scss";

class Loading extends Component {
  constructor(props) {
    super(props);
    this.loaderRef = React.createRef();
    this.loaderTextRef = React.createRef();
  }

  stopLoading(callbackFn) {
    if (this.loaderRef.current) {
      this.loaderRef.current.classList.add("poke-loader-fade");
      this.loaderTextRef.current.classList.add("poke-loader-fade-only");
    }
    setTimeout(() => {
      callbackFn();
    }, 300);
  }

  render() {
    if (this.props.stopLoading) {
      this.stopLoading(this.props.onLoadingStopped);
    }
    return (
      <div className="poke-loader-container" ref={this.loaderRef}>
        <div className="loading-text-cont">
          <h1 className="loading-text-lg" ref={this.loaderTextRef}>
            {this.props.loadingText}
          </h1>
        </div>
      </div>
    );
  }
}

export default Loading;

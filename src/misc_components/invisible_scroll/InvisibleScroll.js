import React, { Component } from "react";
import "./InvisibleScroll.scss";

class InvisibleScroll extends Component {
  render() {
    let className = "invisible-scroll-cont";
    if (this.props.className) className += ` ${this.props.className}`;
    return (
      <div className={className} ref={this.iscRef}>
        {this.props.children}
      </div>
    );
  }
}

export default InvisibleScroll;

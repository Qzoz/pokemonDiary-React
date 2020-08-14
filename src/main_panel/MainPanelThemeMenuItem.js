import React, { Component } from "react";

class MainPanelThemeMenuItem extends Component {
  render() {
    return (
      <span
        className="drop-down-menu-item"
        onClick={() => {
          this.props.colorSelectedHandler(this.props.themeValue);
        }}
      >
        <span className={"demo-color-circle-li " + this.props.bgColorClass} />
        <p className="demo-color-name-li">{this.props.themeValue}</p>
      </span>
    );
  }
}

export default MainPanelThemeMenuItem;

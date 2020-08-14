import React, { Component } from "react";
import "./MainPanel.scss";
import MainPanelTopBar from "./MainPanelTopBar";
import MainPanelContent from "./MainPanelContent";

class MainPanel extends Component {
  render() {
    return (
      <div className="main-panel">
        <MainPanelTopBar />
        <MainPanelContent />
      </div>
    );
  }
}

export default MainPanel;

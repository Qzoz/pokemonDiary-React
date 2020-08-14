import React, { Component } from "react";
import "./SidePanel.scss";
import SidePanelMenu from "./SidePanelMenu";
import SidePanelBrand from "./SidePanelBrand";
import { SidePanelConsumer } from "../misc/SidePanelContext";

class SidePanel extends Component {
  render() {
    return (
      <SidePanelConsumer>
        {({ isSidePanelActive }) => {
          const classIfActive = isSidePanelActive ? " opened": "";
          return (
            <div className={"side-panel" + classIfActive}>
              <div className="side-panel-content">
                <SidePanelBrand />
                <SidePanelMenu />
              </div>
            </div>
          );
        }}
      </SidePanelConsumer>
    );
  }
}

export default SidePanel;

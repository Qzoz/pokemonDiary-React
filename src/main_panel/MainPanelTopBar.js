import React, { Component } from "react";
import FontAwesomeIcon from "../FontAwesome";
import MainPanelThemeMenu from "./MainPanelThemeMenu";
import { SidePanelConsumer } from "../misc/SidePanelContext";

class MainPanelTopBar extends Component {
  render() {
    return (
      <div className="main-nav">
        <div className="search-bar">
          <div className="lead">
            <FontAwesomeIcon icon={["fas", "search"]} />
          </div>
          <input type="text" className="mid" placeholder="Search Here..." />
          <button className="trail">&times;</button>
        </div>
        <div className="poke-theme-switch-cont">
          <MainPanelThemeMenu />
          <SidePanelConsumer>
            {({isSidePanelActive, onToggleSidePanel, isSPToggleAllowed}) => {
              if (!isSPToggleAllowed) return null;
              const iconName = isSidePanelActive ? "arrow-left": "bars";
              return <FontAwesomeIcon
                className="poke-side-nav-switch"
                icon={["fas", iconName]}
                onClick={onToggleSidePanel}
              />;
            }}
          </SidePanelConsumer>
        </div>
      </div>
    );
  }
}

export default MainPanelTopBar;

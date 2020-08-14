import React, { Component } from "react";
import FontAwesomeIcon from "../FontAwesome";
import { NavLink } from "react-router-dom";
import { SidePanelConsumer } from "../misc/SidePanelContext";

class SidePanelMenuItem extends Component {
  constructor(props) {
    super(props);
    this.id = this.props.struct.id;
  }

  render() {
    const struct = this.props.struct;
    return (
      <SidePanelConsumer>
        {({ isSPToggleAllowed, onToggleSidePanel }) => {
          return (
            <NavLink
              to={struct.path}
              className="side-panel-opt"
              onClick={isSPToggleAllowed ? () => {
                setTimeout(function() {
                  onToggleSidePanel();
                }, 700);
              } : null}
            >
              <div className="side-panel-cnt">
                <FontAwesomeIcon icon={struct.fai} size="2x" />
                <p>{struct.value}</p>
              </div>
              <SidePanelMenuSvg />
            </NavLink>
          );
        }}
      </SidePanelConsumer>
    );
  }
}

const SidePanelMenuSvg = () => {
  return (
    <svg
      className="side-panel-fill"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <path d="M100.5,0 Q100.5,20 80,20 H25 Q5,20 5,40 V60 Q5,80 25,80 H80 Q100.5,80 100.5,100Z" />
    </svg>
  );
};

export default SidePanelMenuItem;

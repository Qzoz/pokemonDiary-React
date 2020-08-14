import React, { Component, Fragment } from "react";
import SidePanelMenuItem from "./SidePanelMenuItem";

const MenuItemStructs = [
  {
    id: 101,
    value: "All",
    isActive: false,
    path: "/all",
    fai: ["fas", "globe"],
  },
  {
    id: 102,
    value: "Type",
    isActive: false,
    path: "/type",
    fai: ["fas", "project-diagram"],
  },
  {
    id: 103,
    value: "Evolution",
    isActive: false,
    path: "/evolution",
    fai: ["fas", "layer-group"],
  },
  {
    id: 104,
    value: "Find",
    isActive: false,
    path: "/find",
    fai: ["far", "question-circle"],
  },
];

class SidePanelMenu extends Component {
  render() {
    return (
      <Fragment>
        {MenuItemStructs.length
          ? MenuItemStructs.map((itemStruct) => {
              return (
                <SidePanelMenuItem
                  key={itemStruct.id}
                  struct={itemStruct}
                />
              );
            })
          : null}
      </Fragment>
    );
  }
}

export default SidePanelMenu;

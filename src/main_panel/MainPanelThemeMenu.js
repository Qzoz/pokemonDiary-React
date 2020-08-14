import React, { Component, Fragment } from "react";
import FontAwesomeIcon from "../FontAwesome";
import MainPanelThemeMenuItem from "./MainPanelThemeMenuItem";
import { ThemeConsumer } from "../misc/ThemeContext";
import InvisibleScroll from "../misc_components/invisible_scroll/InvisibleScroll";

const themeMenuItems = [
  {
    id: 100,
    name: "Default",
    clClass: "thbg-default",
  },
  {
    id: 101,
    name: "Normal",
    clClass: "thbg-normal",
  },
  {
    id: 102,
    name: "Fighting",
    clClass: "thbg-fighting",
  },
  {
    id: 103,
    name: "Flying",
    clClass: "thbg-flying",
  },
  {
    id: 104,
    name: "Poison",
    clClass: "thbg-poison",
  },
  {
    id: 105,
    name: "Ground",
    clClass: "thbg-ground",
  },
  {
    id: 106,
    name: "Rock",
    clClass: "thbg-rock",
  },
  {
    id: 107,
    name: "Bug",
    clClass: "thbg-bug",
  },
  {
    id: 108,
    name: "Ghost",
    clClass: "thbg-ghost",
  },
  {
    id: 109,
    name: "Steel",
    clClass: "thbg-steel",
  },
  {
    id: 110,
    name: "Fire",
    clClass: "thbg-fire",
  },
  {
    id: 111,
    name: "Water",
    clClass: "thbg-water",
  },
  {
    id: 112,
    name: "Grass",
    clClass: "thbg-grass",
  },
  {
    id: 113,
    name: "Electric",
    clClass: "thbg-electric",
  },
  {
    id: 114,
    name: "Psychic",
    clClass: "thbg-psychic",
  },
  {
    id: 115,
    name: "Ice",
    clClass: "thbg-ice",
  },
  {
    id: 116,
    name: "Dragon",
    clClass: "thbg-dragon",
  },
  {
    id: 117,
    name: "Dark",
    clClass: "thbg-dark",
  },
  {
    id: 118,
    name: "Fairy",
    clClass: "thbg-fairy",
  },
];

class MainPanelThemeMenu extends Component {
  constructor(props) {
    super(props);
    this.menuTogglerHandler = this.menuTogglerHandler.bind(this);
    this.expandedClass = "expanded";
    this.state = {
      isMenuExpanded: false,
    };
  }

  menuTogglerHandler() {
    this.setState((prevState) => {
      return { isMenuExpanded: !prevState.isMenuExpanded };
    });
  }

  render() {
    let containerClass = "drop-down-menu-cont";
    if (this.state.isMenuExpanded) containerClass += " " + this.expandedClass;
    return (
      <div className={containerClass} onClick={this.menuTogglerHandler}>
        <ThemeConsumer>
          {(value) => {
            return (
              <Fragment>
                <span className="demo-color-circle" />
                <p className="demo-color-name">{value.themeName}</p>
                <span className="drop-down-menu-btn">
                  <FontAwesomeIcon icon={["fas", "caret-down"]} size="2x" />
                </span>
                <InvisibleScroll className="drop-down-menu-item-cont">
                  {themeMenuItems.length
                    ? themeMenuItems.map((item) => {
                        return (
                          <MainPanelThemeMenuItem
                            key={item.id}
                            bgColorClass={item.clClass}
                            themeValue={item.name}
                            colorSelectedHandler={value.onThemeChange}
                          />
                        );
                      })
                    : null}
                </InvisibleScroll>
              </Fragment>
            );
          }}
        </ThemeConsumer>
      </div>
    );
  }
}

export default MainPanelThemeMenu;

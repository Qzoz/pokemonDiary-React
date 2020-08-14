import React, { Component } from "react";
import "./App.scss";
import SidePanel from "./side_panel/SidePanel";
import MainPanel from "./main_panel/MainPanel";
import { ThemeProvider } from "./misc/ThemeContext";
import { pokeThemeData, pokeThemeDataHex } from "./misc/ThemeData";
import { reactLocalStorage as rls } from "reactjs-localstorage";
import PortalContents from "./portal_contents/PortalContents";
import { ModalProvider } from "./misc/ModalContext";
import PokeModalController from "./portal_contents/PokeModal/PokeModalController";
import { SidePanelProvider } from "./misc/SidePanelContext";

class App extends Component {
  constructor(props) {
    super(props);
    this.onThemeChange = this.onThemeChange.bind(this);
    this.onHidePokeModal = this.onHidePokeModal.bind(this);
    this.onShowPokeModal = this.onShowPokeModal.bind(this);
    this.onToggleSidePanel = this.onToggleSidePanel.bind(this);
    this.onWindowResizeLoad = this.onWindowResizeLoad.bind(this);
    this.rlsThemeName = "poke-diary-theme-name";
    this._isMounted = false;
    this.sidePanelBreakPoint = 650;
    this.state = {
      selectedThemeName: rls.get(this.rlsThemeName, "Default"),
      isPokeModalOpen: false,
      pokeModalId: 0,
      isSidePanelActive: false,
      isSPToggleAllowed: false,
    };
    this.changeTheme(this.state.selectedThemeName);
  }

  componentWillUnmount() {
    this._isMounted = false;
    window.removeEventListener("load", this.onWindowResizeLoad);
    window.removeEventListener("resize", this.onWindowResizeLoad);
  }

  componentDidMount() {
    this._isMounted = true;
    window.addEventListener("load", this.onWindowResizeLoad);
    window.addEventListener("resize", this.onWindowResizeLoad);
  }

  onWindowResizeLoad() {
    if (!this._isMounted) return;
    const winInnerWidth = window.innerWidth;
    if (this.state.currWindowWidth === 0) {
      winInnerWidth < this.sidePanelBreakPoint
        ? this.setState({
            isSidePanelActive: false,
            isSPToggleAllowed: true,
          })
        : this.setState({
            isSidePanelActive: false,
            isSPToggleAllowed: false,
          });
    } else {
      if (winInnerWidth >= this.sidePanelBreakPoint) {
        if (this.state.isSPToggleAllowed) {
          this.setState({
            isSidePanelActive: false,
            isSPToggleAllowed: false,
          });
        }
      } else {
        if (!this.state.isSPToggleAllowed) {
          this.setState({
            isSidePanelActive: false,
            isSPToggleAllowed: true,
          });
        }
      }
    }
  }

  onToggleSidePanel() {
    if (!this.state.isSPToggleAllowed) return;
    this.setState((prevState) => {
      return { isSidePanelActive: !prevState.isSidePanelActive };
    });
  }

  changeTheme(themeColor) {
    const lowerThemeColor = themeColor.toLowerCase();
    document.documentElement.style.setProperty(
      "--cl-primary",
      pokeThemeData[lowerThemeColor]
    );
    document
      .getElementById("qz-browser-theme-color")
      .setAttribute("content", pokeThemeDataHex[lowerThemeColor]);
    rls.set(this.rlsThemeName, themeColor);
  }

  onThemeChange(themeColor) {
    this.changeTheme(themeColor);
    this.setState({ selectedThemeName: themeColor });
  }

  onHidePokeModal() {
    this.setState({ isPokeModalOpen: false });
  }

  onShowPokeModal(id) {
    this.setState({ pokeModalId: id, isPokeModalOpen: true });
  }

  render() {
    return (
      <ThemeProvider
        value={{
          themeName: this.state.selectedThemeName,
          onThemeChange: this.onThemeChange,
        }}
      >
        <ModalProvider
          value={{
            isModalOpen: this.state.isPokeModalOpen,
            activePokeId: this.state.pokeModalId,
            onHideModal: this.onHidePokeModal,
            onShowModal: this.onShowPokeModal,
          }}
        >
          <SidePanelProvider
            value={{
              isSPToggleAllowed: this.state.isSPToggleAllowed,
              isSidePanelActive: this.state.isSidePanelActive,
              onToggleSidePanel: this.onToggleSidePanel,
            }}
          >
            <div className="container-all">
              <SidePanel />
              <MainPanel />
            </div>
          </SidePanelProvider>
          <PortalContents>
            <PokeModalController />
          </PortalContents>
        </ModalProvider>
      </ThemeProvider>
    );
  }
}

export default App;

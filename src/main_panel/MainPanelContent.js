import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import RouteAll from "../route_contents/All/RouteAll";
import RouteType from "../route_contents/Type/RouteType";
import RouteTypeNamed from "../route_contents/Type/RouteTypeNamed";
import RouteEvolution from "../route_contents/Evolution/RouteEvolution";
import RouteFind from "../route_contents/Find/RouteFind";
import Home from "../route_contents/Home/Home";
import RouteTypeInfo from "../route_contents/Type/RouteTypeInfo";

class MainPanelContent extends Component {
  render() {
    return (
      <div className="main-content">
        <Switch>
          <Route path="/all" component={RouteAll} />
          <Route path="/type/:type/pokemons" component={RouteTypeNamed} />
          <Route path="/type/:type" component={RouteTypeInfo} />
          <Route path="/type" component={RouteType} />
          <Route path="/evolution" component={RouteEvolution} />
          <Route path="/find" component={RouteFind} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    );
  }
}

export default MainPanelContent;

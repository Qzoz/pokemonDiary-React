import React, { Component } from "react";
import "./PokeDetails.scss";
import EvolutionCards from "../../poke_components/evolution_cards/EvolutionCards";

class PokeDetailEvolution extends Component {
  render() {
    const settled = this.props.isRight ? "right" : "left";
    return (
      <div className="poke-detail-cont">
        <h2 className={`${settled}-settled`}>Evolution Chain</h2>
        <div className="poke-detail-evolution-holder">
          <EvolutionCards evoUrl={this.props.evoUrl} pokeName={this.props.pokeName}/>
        </div>
      </div>
    );
  }
}

export default PokeDetailEvolution;

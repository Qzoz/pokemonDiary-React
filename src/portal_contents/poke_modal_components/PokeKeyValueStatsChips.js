import React, { Component } from "react";
import "./PokeKeyValueChip.scss";

class PokeKeyValueStatsChips extends Component {
  render() {
    return (
      <div className="poke-detail-stat-chip">
        <div className="poke-detail-stat-name">
          <p>{this.props.statName}</p>
        </div>
        <div className="poke-detail-stat-val">
          <p>{this.props.statVal}</p>
        </div>
      </div>
    );
  }
}

export default PokeKeyValueStatsChips;

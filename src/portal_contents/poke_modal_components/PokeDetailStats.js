import React, { Component } from "react";
import PokeKeyValueStatsChips from "./PokeKeyValueStatsChips";
import "./PokeDetails.scss";

class PokeDetailStats extends Component {
  render() {
    const settled = this.props.isRight ? "right" : "left";
    const statsList = this.props.stats ? this.props.stats : [];
    let totalStat = 0;
    return (
      <div className="poke-detail-cont">
        <h2 className={`${settled}-settled`}>Base Stats</h2>
        <div className="poke-detail-stat-holder">
          {statsList.length
            ? statsList.map((value) => {
                totalStat += value.base_stat;
                return (
                  <div
                    key={`key-${value.stat.name}`}
                    className="poke-detail-stat-cont"
                  >
                    <PokeKeyValueStatsChips
                      statName={value.stat.name}
                      statVal={value.base_stat}
                    />
                  </div>
                );
              })
            : null}
          <div key={`key-total-stat`} className="poke-detail-stat-cont total-stat">
            <PokeKeyValueStatsChips
              statName="Total"
              statVal={totalStat}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default PokeDetailStats;

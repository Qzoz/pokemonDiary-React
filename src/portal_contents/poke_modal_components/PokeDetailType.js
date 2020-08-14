import React, { Component } from "react";
import TypeCards from "../../poke_components/type_cards/TypeCards";
import "./PokeDetails.scss";
import { capitalizedName } from "../../misc/poke_misc";

class PokeDetailType extends Component {
  render() {
    const settled = this.props.isRight ? "right" : "left";
    const typeList = this.props.types ? this.props.types : [];
    return (
      <div className="poke-detail-cont">
        <h2 className={`${settled}-settled`}>Pokemon Type/s</h2>
        {typeList.length ? (
          <div className="poke-detail-type-holder">
            {typeList.map((value) => {
              const capitalizeName = capitalizedName(value.type.name);
              return (
                <TypeCards
                  key={`key-${capitalizeName}`}
                  struct={{ name: capitalizeName }}
                  isDemo={true}
                />
              );
            })}
          </div>
        ) : null}
      </div>
    );
  }
}

export default PokeDetailType;

import React, { Component } from "react";
import { getPokeUrlWithIdPad, capitalizedName } from "../../misc/poke_misc";
import Image, { Shimmer } from "react-shimmer";

class PokeDetailVarieties extends Component {
  constructor(props) {
    super(props);
    this.pokeImgUrl =
      "https://assets.pokemon.com/assets/cms2/img/pokedex/full/";
  }

  render() {
    const basePokeId = this.props.pokeId;
    const varieties = this.props.varieties;
    const settled = this.props.isRight ? "right" : "left";
    if (basePokeId === 0) return null;
    return (
      <div className="poke-detail-cont">
        <h2 className={`${settled}-settled`}>Varieties</h2>
        <div className="poke-detail-varieties-holder">
          {varieties.length
            ? varieties.map((value, index) => {
                let spPokeImgUrl = "";
                if (index > 0) spPokeImgUrl = `_f${index + 1}`;
                return (
                  <PokeDetailVarietiesCard
                    key={`key-${basePokeId}_f${index}`}
                    pokeImgUrl={getPokeUrlWithIdPad(
                      this.pokeImgUrl,
                      basePokeId,
                      ".png",
                      spPokeImgUrl
                    )}
                    pokeName={value.pokemon.name}
                  />
                );
              })
            : null}
        </div>
      </div>
    );
  }
}

const PokeDetailVarietiesCard = (props) => {
  return (
    <div className="poke-variety-card">
      <div className="poke-variety-image-cont">
        <Image
          NativeImgProps={{ className: "poke-variety-image" }}
          src={props.pokeImgUrl ? props.pokeImgUrl : ""}
          fallback={getShimmer()}
          errorFallback={() => getShimmer()}
        />
      </div>
      <p>{capitalizedName(props.pokeName)}</p>
    </div>
  );
};

const getShimmer = () => <Shimmer width={500} height={500} />;

export default PokeDetailVarieties;

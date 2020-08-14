import React from "react";
import PokeDetailVarieties from "../poke_modal_components/PokeDetailVarieties";
import PokeDetailStats from "../poke_modal_components/PokeDetailStats";
import PokeDetailType from "../poke_modal_components/PokeDetailType";
import PokeDetailEvolution from "../poke_modal_components/PokeDetailEvolution";
import PokeKeyValueChip from "../poke_modal_components/PokeKeyValueChip";
import Image, { Shimmer } from "react-shimmer";
import {getPokeUrlWithIdPad} from "../../misc/poke_misc";

const PokeModalContent = (props) => {
  const pokeImgUrl = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/";
  const {
    pokeId,
    pokeName,
    height,
    weight,
    evolutionUrl,
    types,
    stats,
    abilities,
    varieties,
    svgImgUrl,
    pokeNameC
  } = props;
  return (
    <div className="poke-details">
      <div className="poke-detail-row">
        <div className="poke-detail-col">
          <div className="poke-detail-image-cont">
            <Image
              NativeImgProps={{ className: "poke-detail-image" }}
              src={
                pokeId
                  ? getPokeUrlWithIdPad(pokeImgUrl, pokeId, ".png")
                  : ""
              }
              fallback={getShimmer()}
              errorFallback={() => getShimmer()}
            />
          </div>
        </div>
        <div className="poke-detail-col">
          {pokeName ? (
            <div className="poke-detail-basic">
              <PokeKeyValueChip
                tag="ID"
                val={pokeId}
                isValNum={true}
                valPreffix="#"
              />
              <PokeKeyValueChip tag="Name" val={pokeNameC} />
              <PokeKeyValueChip
                tag="Weight"
                val={weight / 10}
                isValNum={true}
                valExt="kgs."
              />
              <PokeKeyValueChip
                tag="Height"
                val={height / 10}
                isValNum={true}
                valExt="m."
              />
            </div>
          ) : null}
        </div>
      </div>
      {types.length ? <PokeDetailType types={types} isRight={true} /> : null}
      {stats.length ? <PokeDetailStats stats={stats} /> : null}
      {varieties.length && varieties[0].pokemon.name === pokeName ? (
        <PokeDetailVarieties
          pokeId={pokeId}
          varieties={varieties}
          isRight={true}
        />
      ) : null}
      {evolutionUrl ? (
        <PokeDetailEvolution
          key={`key-${evolutionUrl}`}
          evoUrl={evolutionUrl}
          pokeName={pokeName}
        />
      ) : null}
    </div>
 );
};

const getShimmer = () => <Shimmer width={750} height={500} />;

export default PokeModalContent;

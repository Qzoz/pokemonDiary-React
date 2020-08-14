import React, { Component } from "react";
import "./PokeAvatars.scss";
import { getPokeIdFromUrl, capitalizedName } from "../../misc/poke_misc";
import Image, { Shimmer } from "react-shimmer";
import FontAwesomeIcon from "../../FontAwesome";
import { ModalConsumer } from "../../misc/ModalContext";

class PokeAvatars extends Component {
  render() {
    const pokeName = capitalizedName(this.props.pokeData.name);
    const pokeId = getPokeIdFromUrl(this.props.pokeData.url);
    const avatarSize = this.props.avatarSize ? this.props.avatarSize : 1;
    const pokeImgURL =
      "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" +
      `${pokeId}`.padStart(3, "0") +
      ".png";
    return (
      <div className="avatar-container">
        <div className={`avatar-image-cont avt-size-${avatarSize}`}>
          <Image
            NativeImgProps={{ className: "avatar-image" }}
            src={pokeImgURL}
            fallback={getShimmer()}
            errorFallback={() => getShimmer()}
          />
        </div>
        <p className="avatar-title">
          {pokeName}{" "}
          {this.props.isInfoDisabled ? null : (
            <ModalConsumer>
              {({ onShowModal }) => {
                return (
                  <FontAwesomeIcon
                    className="avater-info"
                    icon={["fas", "info-circle"]}
                    onClick={() => onShowModal(pokeId)}
                  />
                );
              }}
            </ModalConsumer>
          )}
        </p>
      </div>
    );
  }
}

const getShimmer = () => <Shimmer width={200} height={200} />;

export default PokeAvatars;

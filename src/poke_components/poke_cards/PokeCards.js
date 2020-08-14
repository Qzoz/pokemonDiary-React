import React, { Component } from "react";
import Image, { Shimmer } from "react-shimmer";
import FontAwesomeIcon from "../../FontAwesome";
import "./PokeCards.scss";
import { ModalConsumer } from "../../misc/ModalContext";

class PokeCards extends Component {
  constructor(props) {
    super(props);
    this.pokeImgURL =
      "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" +
      `${props.pokeId}`.padStart(3, "0") +
      ".png";
  }

  render() {
    const name = this.props.name;
    const nativeImgProp = {
      className: "poke-img",
    };
    return (
      <div className="poke-card">
        <Image
          NativeImgProps={nativeImgProp}
          src={this.pokeImgURL}
          fallback={getShimmer()}
          errorFallback={() => getShimmer()}
        />
        <div className="poke-title">
          <p>
            <span className="poke-id">
              #<span>{this.props.pokeId}</span>
            </span>
            &nbsp;&nbsp;
            {name[0].toUpperCase() + name.substring(1).toLowerCase()}&nbsp;
            <ModalConsumer>
              {({ onShowModal }) => {
                return (
                  <FontAwesomeIcon
                    className="poke-info"
                    icon={["fas", "info-circle"]}
                    onClick={() => onShowModal(this.props.pokeId)}
                  />
                );
              }}
            </ModalConsumer>
          </p>
        </div>
      </div>
    );
  }
}

const getShimmer = () => (
  <Shimmer className="poke-img" width={250} height={250} />
);

export default PokeCards;

import React, { Component, Fragment } from "react";
import axios from "axios";
import "./EvolutionCards.scss";
import OnError from "../../misc_components/error/OnError";
import PokeAvatars from "../poke_avatars/PokeAvatars";
import { getPokeIdFromUrl } from "../../misc/poke_misc";

class EvolutionCards extends Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.fetchEvolutionChain = this.fetchEvolutionChain.bind(this);
    this.state = {
      evolutionId: 0,
      evolutionChain: null,
      hasError: false,
      errorMsg: ""
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.fetchEvolutionChain();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  fetchEvolutionChain() {
    axios
      .get(this.props.evoUrl)
      .then((result) => {
        this._isMounted &&
          this.setState({
            evolutionId: result.data.id,
            evolutionChain: result.data.chain,
            hasError: false,
          });
      })
      .catch((error) => {
        this._isMounted && this.setState({
          hasError: true,
          errorMsg: error.message
        })
      });
  }

  prepareView(evolveChain, childDepth, currPokeName) {
    return (
      <Fragment>
        <div className="evolve-box">
          <div className={`evolve-box-child f-${childDepth}`}>
            <div className="evolve-box-content">
              <PokeAvatars
                key={`key-${evolveChain.species.name}`}
                avatarSize={childDepth}
                pokeData={evolveChain.species}
                isInfoDisabled={
                  currPokeName.toLowerCase() ===
                  evolveChain.species.name.toLowerCase()
                }
              />
            </div>
          </div>
          {evolveChain.evolves_to.length ? (
            <div
              className={`evolve-box-child f-${childDepth} ${
                evolveChain.evolves_to.length > 2 ? "d-2" : ""
              } ${
                childDepth === 3 && evolveChain.evolves_to.length >= 2
                  ? "c-2"
                  : ""
              }`}
            >
              {evolveChain.evolves_to.map((value) => {
                return (
                  <Fragment key={value.species.name}>
                    {this.prepareView(value, childDepth - 1, currPokeName)}
                  </Fragment>
                );
              })}
            </div>
          ) : null}
        </div>
      </Fragment>
    );
  }

  render() {
    const { evolutionChain, evolutionId } = this.state;
    const childDepth = evolutionChain
      ? evolutionChain.evolves_to.length
        ? evolutionChain.evolves_to[0].evolves_to.length
          ? 3
          : 2
        : 1
      : 0;
    const evolutionView = evolutionChain
      ? this.prepareView(
          evolutionChain,
          childDepth,
          this.props.pokeName ? this.props.pokeName : ""
        )
      : null;
    if (this.state.hasError) {
      return (
        <OnError
          errorMsg={`Unable To Fetch Evolution ID: ${getPokeIdFromUrl(
            this.props.evoUrl
          )}`}
          showRetry
          onRetry={this.fetchEvolutionChain}
        >
          <br />
          <span>Reason: {this.state.errorMsg}</span>
        </OnError>
      );
    }
    return (
      <div className={`evolution-card card-depth-${childDepth}`}>
        {evolutionView}{" "}
        <span className="evolution-id">
          #<span>{evolutionId}</span>
        </span>
      </div>
    );
  }
}

export default EvolutionCards;

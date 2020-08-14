import React, { Component, Fragment } from "react";
import axios from "axios";
import { getPokeIdFromUrl } from "../../misc/poke_misc";
import PokeCards from "../../poke_components/poke_cards/PokeCards";

class TypeNpage extends Component {
  constructor(props) {
    super(props);
    this.typeUrl = `https://pokeapi.co/api/v2/type/${this.props.typeName}`;
    this.maxPokeIdAllowed = 807;
    this.state = {
      pokemonList: [],
      moveList: [],
    };
  }

  componentDidMount() {
    axios
      .get(this.typeUrl)
      .then((result) => {
        this.setState({
          pokemonList: result.data.pokemon.filter((value) => {
            if (getPokeIdFromUrl(value.pokemon.url) > this.maxPokeIdAllowed)
              return false;
            return true;
          }),
          moveList: result.data.moves,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const pokeList = this.state.pokemonList;
    return (
      <Fragment>
        <div className="type-poke-count">
          <span className="type-poke-count-lbl">
            Pokemon Count
            <span className="type-poke-count-val">{pokeList.length}</span>
          </span>
        </div>
        <div className="type-poke-card-holder">
          {pokeList.length
            ? pokeList.map((value) => {
                let pId = getPokeIdFromUrl(value.pokemon.url);
                if (pId > this.maxPokeIdAllowed) return null;
                return (
                  <PokeCards key={pId} pokeId={pId} name={value.pokemon.name} />
                );
              })
            : null}
        </div>
      </Fragment>
    );
  }
}

export default TypeNpage;

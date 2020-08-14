import React, { Component } from "react";
import TypeCards from "../../poke_components/type_cards/TypeCards";


const typeCardsInfo = [
  {
    id: 101,
    name: "Normal",
  },
  {
    id: 102,
    name: "Fighting",
  },
  {
    id: 103,
    name: "Flying",
  },
  {
    id: 104,
    name: "Poison",
  },
  {
    id: 105,
    name: "Ground",
  },
  {
    id: 106,
    name: "Rock",
  },
  {
    id: 107,
    name: "Bug",
  },
  {
    id: 108,
    name: "Ghost",
  },
  {
    id: 109,
    name: "Steel",
  },
  {
    id: 110,
    name: "Fire",
  },
  {
    id: 111,
    name: "Water",
  },
  {
    id: 112,
    name: "Grass",
  },
  {
    id: 113,
    name: "Electric",
  },
  {
    id: 114,
    name: "Psychic",
  },
  {
    id: 115,
    name: "Ice",
  },
  {
    id: 116,
    name: "Dragon",
  },
  {
    id: 117,
    name: "Dark",
  },
  {
    id: 118,
    name: "Fairy",
  },
];

class TypePage extends Component {
  render() {
    return (
      <div className="type-card-holder">
        { typeCardsInfo.length ? typeCardsInfo.map((value) => {
            return <TypeCards key={value.id} struct={value}/>
        }): null}
      </div>
    );
  }
}

export default TypePage;

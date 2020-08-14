import React, { Component, Fragment } from "react";
import "./TypeInfoCards.scss";
import Image, { Shimmer } from "react-shimmer";
import { typeIconMap, masterTypeIconMap, goTypeIconMap } from "../../misc/IconData";
import { capitalizedName, capitalizedNameDash } from "../../misc/poke_misc";
import axios from "axios";
import Loader from "../../misc_components/loading/Loader";
import OnError from "../../misc_components/error/OnError";
import TypeDmRel from "./TypeDmRel";

class TypeInfoCards extends Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.fetchTypeData = this.fetchTypeData.bind(this);
    this.typeDataUrl = "https://pokeapi.co/api/v2/type/" + props.type;
    this.state = {
      isLoaded: false,
      hasError: false,
      errorMsg: null,
      typeDamageRel: null,
      typeGeneration: null,
      typeMoves: null,
      typeId: 0,
    };
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    this.fetchTypeData();
  }

  fetchTypeData() {
    this._isMounted && this.setState({ isLoaded: false, hasError: false });
    axios
      .get(this.typeDataUrl)
      .then((result) => {
        this._isMounted &&
          this.setState({
            isLoaded: true,
            hasError: false,
            typeId: result.data.id,
            typeMoves: result.data.moves,
            typeGeneration: result.data.generation,
            typeDamageRel: result.data.damage_relations,
          });
      })
      .catch((error) => {
        this._isMounted &&
          this.setState({
            isLoaded: true,
            hasError: true,
            errorMsg: error.message,
          });
      });
  }

  render() {
    const lowerName = this.props.type;
    const upperName = capitalizedName(lowerName);
    const { typeId, typeDamageRel, typeGeneration, typeMoves } = this.state;
    return (
      <Fragment>
        <Loader isLoaded={this.state.isLoaded} loadingText="Cooking" />
        {this.state.isLoaded && !this.state.hasError ? (
          <div className="poke-type-details">
            <div className="poke-type-cont-row">
              <div className="poke-type-cont-col  poke-image-col-dec">
                <div className="poke-type-img-cont">
                  <Image
                    NativeImgProps={{
                      className: "poke-type-img",
                    }}
                    src={lowerName ? typeIconMap[lowerName] : ""}
                    fallback={getShimmer()}
                    errorFallback={() => getShimmer()}
                  />
                </div>
              </div>
              <div className="poke-type-cont-col poke-type-basic-info">
                <div className="poke-type-details-pair">
                  <p className="font-um">{typeId}</p>
                  <p>ID</p>
                </div>
                <div className="poke-type-details-pair">
                  <p>{upperName}</p>
                  <p>Type</p>
                </div>
                <div className="poke-type-details-pair">
                  <p>{capitalizedNameDash(typeGeneration.name)}</p>
                  <p>In</p>
                </div>
              </div>
            </div>
            <div className="poke-type-info-holder">
              <h2 className="left-settled">Damage Relations</h2>
              <h3>Damage To</h3>
              <div className="poke-type-dm-rel-pair">
                <TypeDmRel
                  relRatio="2"
                  typeList={typeDamageRel.double_damage_to}
                />
                <TypeDmRel
                  relRatio="0.5"
                  typeList={typeDamageRel.half_damage_to}
                />
                <TypeDmRel relRatio="0" typeList={typeDamageRel.no_damage_to} />
              </div>
              <h3>Damage From</h3>
              <div className="poke-type-dm-rel-pair">
                <TypeDmRel
                  relRatio="2"
                  typeList={typeDamageRel.double_damage_from}
                />
                <TypeDmRel
                  relRatio="0.5"
                  typeList={typeDamageRel.half_damage_from}
                />
                <TypeDmRel
                  relRatio="0"
                  typeList={typeDamageRel.no_damage_from}
                />
              </div>
            </div>
            <div className="poke-type-info-holder">
              <h2>Icon Designs</h2>
              <div className="poke-type-icon-other">
                <div className="poke-type-icon-chip">
                  <div className="chip-icon">
                    <Image
                      NativeImgProps={{
                        className: "icon",
                      }}
                      src={lowerName ? typeIconMap[lowerName] : ""}
                      fallback={getShimmer()}
                      errorFallback={() => getShimmer()}
                    />
                  </div>
                  <p className="chip-name">Plain</p>
                </div>
                <div className="poke-type-icon-chip">
                  <div className="chip-icon">
                    <Image
                      NativeImgProps={{
                        className: "icon",
                      }}
                      src={lowerName ? goTypeIconMap[lowerName] : ""}
                      fallback={getShimmer()}
                      errorFallback={() => getShimmer()}
                    />
                  </div>
                  <p className="chip-name">Go</p>
                </div>
                <div className="poke-type-icon-chip">
                  <div className="chip-icon">
                    <Image
                      NativeImgProps={{
                        className: "icon",
                      }}
                      src={lowerName ? masterTypeIconMap[lowerName] : ""}
                      fallback={getShimmer()}
                      errorFallback={() => getShimmer()}
                    />
                  </div>
                  <p className="chip-name">Master</p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {this.state.hasError && (
          <OnError
            showRetry
            errorText="Oh"
            errorMsg={this.state.errorMsg}
            onRetry={this.fetchTypeData}
            retryMsg="Check Your Internet Connection. And try Again"
          />
        )}
      </Fragment>
    );
  }
}

const getShimmer = () => <Shimmer height={200} width={200} />;

export default TypeInfoCards;

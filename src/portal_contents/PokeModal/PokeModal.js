import React, { Component } from "react";
import "./PokeModal.scss";
import axios from "axios";
import FontAwesomeIcon from "../../FontAwesome";
import PokeKeyValueChip from "../poke_modal_components/PokeKeyValueChip";
import { capitalizedName } from "../../misc/poke_misc";
import Loader from "../../misc_components/loading/Loader";
import PokeModalContent from "./PokeModalContent";
import OnError from "../../misc_components/error/OnError";

class PokeModal extends Component {
  constructor(props) {
    super(props);
    this.updatePokeData = this.updatePokeData.bind(this);
    this.openModalContent = this.openModalContent.bind(this);
    this.fetchPokemonDetail = this.fetchPokemonDetail.bind(this);
    this.modalContentRef = React.createRef();
    this.pokeUrl = "https://pokeapi.co/api/v2/pokemon/";
    this.pokeSpeciesUrl = "https://pokeapi.co/api/v2/pokemon-species/";
    this.state = {
      doneLoading: false,
      pokeDataError: false,
      pokeDataErrorMsg: null,
      pokeSpeciesError: false,
      pokeSpeciesErrorMsg: null,
      pokeId: 0,
      pokeName: null,
      height: 0,
      weight: 0,
      abilities: [],
      svgImgUrl: null,
      stats: {},
      types: [],
      evolutionUrl: null,
      varieties: [],
    };
  }

  componentDidMount() {
    this.updatePokeData();
  }

  componentDidUpdate() {
    if (this.state.pokeId !== this.props.activePokeId) {
      if (!this.state.pokeDataError) {
        this.updatePokeData();
      }
    }
  }

  updatePokeData() {
    if (this.state.doneLoading) {
      this.setState({
        doneLoading: false,
      });
    }
    this.fetchPokemonDetail(
      this.pokeUrl + this.props.activePokeId,
      this.pokeSpeciesUrl + this.props.activePokeId
    );
  }

  updateStateVars(updateParams) {
    const {
      pokeData,
      pokeSpeciesData,
      updateWhat,
      hasErrorData,
      errorMsgData,
      hasErrorSpc,
      errorMsgSpc,
    } = updateParams;

    const updatedState = {
      doneLoading: true,
    };
    if (updateWhat === 0 || updateWhat === 1) {
      if (hasErrorData) {
        updatedState.pokeDataError = true;
        updatedState.pokeDataErrorMsg = errorMsgData;
      } else {
        updatedState.pokeDataError = false;
        updatedState.pokeId = pokeData.id;
        updatedState.pokeName = pokeData.name;
        updatedState.abilities = pokeData.abilities;
        updatedState.height = pokeData.height;
        updatedState.weight = pokeData.weight;
        updatedState.svgImgUrl =
          pokeData.sprites.other.dream_world.front_default;
        updatedState.stats = pokeData.stats;
        updatedState.types = pokeData.types;
      }
    }
    if (updateWhat === 0 || updateWhat === 2) {
      if (hasErrorSpc) {
        updatedState.pokeSpeciesError = true;
        updatedState.pokeDataErrorMsg = errorMsgSpc;
      } else {
        updatedState.pokeSpeciesError = false;
        updatedState.evolutionUrl = pokeSpeciesData.evolution_chain.url;
        updatedState.varieties = pokeSpeciesData.varieties;
      }
    }
    this.setState(updatedState);
  }

  async fetchPokemonDetail(dataUrl, speciesUrl, updateDataOrSpc) {
    const updateParams = {
      pokeData: null,
      pokeSpeciesData: null,
      updateWhat: updateDataOrSpc ? updateDataOrSpc : 0,
      hasErrorData: false,
      errorMsgData: null,
      hasErrorSpc: false,
      errorMsgSpc: null,
    };

    if (updateParams.updateWhat === 0 || updateParams.updateWhat === 1) {
      try {
        updateParams.pokeData = (await axios.get(dataUrl)).data;
      } catch (error) {
        updateParams.hasErrorData = true;
        updateParams.errorMsgData = error.message;
      }
    }
    if (updateParams.updateWhat === 0 || updateParams.updateWhat === 2) {
      try {
        updateParams.pokeSpeciesData = (await axios.get(speciesUrl)).data;
      } catch (error) {
        updateParams.hasErrorSpc = true;
        updateParams.errorMsgSpc = error.message;
      }
    }
    this.updateStateVars(updateParams);
  }

  openModalContent() {
    if (this.modalContentRef && this.modalContentRef.current) {
      this.modalContentRef.current.classList.add("opened");
      setTimeout(() => {
        this.modalContentRef.current.classList.add("toped-scrollable");
        this.modalContentRef.current.scrollTop = 0;
      }, 500);
    }
  }

  closeModalContent(callbackFn) {
    if (this.modalContentRef && this.modalContentRef.current) {
      this.modalContentRef.current.classList.remove("toped-scrollable");
      this.modalContentRef.current.classList.remove("opened");
    }
    setTimeout(() => {
      callbackFn();
    }, 500);
  }

  render() {
    const { pokeId, pokeName } = this.state;
    const pokeNameC = capitalizedName(pokeName);
    let modalContent = null;
    let modalIdNameChip = null;
    if (
      this.state.doneLoading &&
      !this.state.pokeDataError &&
      this.props.isModalOpen
    ) {
      modalContent = (
        <div className="modal-content" ref={this.modalContentRef}>
          <PokeModalContent
            {...{
              pokeId: pokeId,
              pokeName: pokeName,
              height: this.state.height,
              weight: this.state.weight,
              evolutionUrl: this.state.evolutionUrl,
              types: this.state.types,
              stats: this.state.stats,
              abilities: this.state.abilities,
              varieties: this.state.varieties,
              svgImgUrl: this.state.svgImgUrl,
              pokeNameC: pokeNameC,
            }}
          />
        </div>
      );
      modalIdNameChip = (
        <PokeKeyValueChip
          tag={pokeId}
          val={pokeNameC}
          isTagNum={true}
          tagPreffix="#"
          isSingle={true}
        />
      );
      setTimeout(() => this.openModalContent(), 500);
    }
    return (
      <div
        className={`modal-container ${
          this.props.isModalOpen ? "opened" : "closed"
        }`}
      >
        <div className="modal-heading">
          {modalIdNameChip ? modalIdNameChip : <span></span>}
          <FontAwesomeIcon
            icon={["fas", "times"]}
            className="modal-close"
            onClick={() => this.closeModalContent(this.props.onModalClose)}
          />
        </div>
        <Loader loadingText="Cooking" isLoaded={this.state.doneLoading} />
        <OnError
          showRetry
          showError={this.state.pokeDataError}
          errorMsg={this.state.pokeDataErrorMsg}
          retryMsg="Check the connection and try again."
          onRetry={() => {
            this.updatePokeData();
          }}
        />
        {modalContent}
      </div>
    );
  }
}

export default PokeModal;

import React, { Component, Fragment } from "react";
import axios from "axios";
import PokeCards from "../../poke_components/poke_cards/PokeCards";
import PageTurner from "../components/PageTurner";
import { getPokeIdFromUrl } from "../../misc/poke_misc";

class AllPage extends Component {
  constructor(props) {
    super(props);
    this.onPageChangeHandler = this.onPageChangeHandler.bind(this);
    this.onPageNumChangeHandler = this.onPageNumChangeHandler.bind(this);
    this.onPageNumEntered = this.onPageNumEntered.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.pokeURL = "https://pokeapi.co/api/v2/pokemon/";
    this.pageLen = 20;
    this._isMounted = false;
    this.state = {
      pokemonCount: 807,
      pokemonPrev: null,
      pokemonNext: null,
      pokemonList: [],
      pageNo: 0,
      pageNum: 0,
      pageCount: 0,
    };
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    axios
      .get(this.pokeURL)
      .then((result) => {
        this._isMounted && this.setState((prevState) => {
          return {
            pageCount:
              prevState.pokemonCount % this.pageLen !== 0
                ? Math.round(prevState.pokemonCount / this.pageLen + 1)
                : Math.round(prevState.pokemonCount / this.pageLen),
            pageNo: 1,
            pageNum: 1,
            pokemonNext: result.data.next,
            pokemonPrev: result.data.previous,
            pokemonList: result.data.results,
          };
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  fetchUrlforState(url, pageNum) {
    const pageNo = pageNum;
    axios
      .get(url)
      .then((result) => {
        this._isMounted && this.setState({
          pageNo: pageNo,
          pageNum: pageNo,
          pokemonNext: result.data.next,
          pokemonPrev: result.data.previous,
          pokemonList: result.data.results,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onPageChangeHandler(direction) {
    const pageDir = direction === "prev" ? -1 : 1;
    this.onPageNumChangeHandler(this.state.pageNo + pageDir);
  }

  onPageNumEntered(e) {
    try {
      let pageNum = parseInt(e.target.value);
      if (e.target.value === "") this.setState({ pageNum: e.target.value });
      if (isNaN(pageNum)) return;
      if (pageNum > this.state.pageCount) return;
      this.setState({ pageNum: pageNum });
    } catch (error) {}
  }
  onKeyPress(e) {
    if (e.key === "Enter" && this.state.pageNum !== "")
      this.onPageNumChangeHandler(this.state.pageNum);
  }
  onPageNumChangeHandler(pageTo) {
    if (pageTo === 0) pageTo = 1;
    if (pageTo === this.state.pageNo) return;
    let limit = this.pageLen;
    if (pageTo * this.pageLen > this.state.pokemonCount)
      limit = this.state.pokemonCount - (pageTo - 1) * this.pageLen;
    this.fetchUrlforState(
      `https://pokeapi.co/api/v2/pokemon/?offset=${
        (pageTo - 1) * this.pageLen
      }&limit=${limit}`,
      pageTo
    );
  }

  render() {
    const { pokemonList, pokemonPrev, pageNo, pageCount, pageNum } = this.state;
    const pageTurnerStruct =
      pokemonList.length !== 0
        ? {
            isFirst: pokemonPrev == null,
            isLast: pageNo * this.pageLen >= this.state.pokemonCount,
            fromNo: getPokeIdFromUrl(pokemonList[0].url),
            toNo: getPokeIdFromUrl(pokemonList[pokemonList.length - 1].url),
            pageNo: pageNo,
            pageCount: pageCount,
            pageNum: pageNum,
          }
        : {};
    return (
      <Fragment>
        <div className="card-holder">
          {pokemonList.length
            ? pokemonList.map((value) => {
                let pId = getPokeIdFromUrl(value.url);
                return <PokeCards key={pId} pokeId={pId} name={value.name} />;
              })
            : null}
        </div>
        {pokemonList.length ? (
          <PageTurner
            struct={pageTurnerStruct}
            onPageChange={this.onPageChangeHandler}
            onKeyPress={this.onKeyPress}
            onPageNumEntered={this.onPageNumEntered}
          />
        ) : null}
      </Fragment>
    );
  }
}

export default AllPage;

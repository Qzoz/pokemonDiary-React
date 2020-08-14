import React, { Component, Fragment } from "react";
import EvolutionCards from "../../poke_components/evolution_cards/EvolutionCards";
import axios from "axios";
import "./RouteEvolution.scss";
import { getPokeIdFromUrl } from "../../misc/poke_misc";
import PageTurner from "../components/PageTurner";

class EvolutionPage extends Component {
  constructor(props) {
    super(props);
    this.onPageNumChangeHandler = this.onPageNumChangeHandler.bind(this);
    this.onPageChangeHandler = this.onPageChangeHandler.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onPageNumEntered = this.onPageNumEntered.bind(this);
    this.evolutionUrl = "https://pokeapi.co/api/v2/evolution-chain/";
    this.pageLen = 20;
    this.state = {
      evolutionCount: 0,
      evolutionList: [],
      evolutionPrev: null,
      evolutionNext: null,
      pageNo: 0,
      pageNum: 0,
      pageCount: 0,
    };
  }

  componentDidMount() {
    axios
      .get(this.evolutionUrl)
      .then((result) => {
        this.setState({
          evolutionCount: result.data.count,
          evolutionList: result.data.results,
          evolutionPrev: result.data.previous,
          evolutionNext: result.data.next,
          pageNo: 1,
          pageNum: 1,
          pageCount: Math.round(result.data.count / this.pageLen),
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
        this.setState({
          evolutionList: result.data.results,
          evolutionPrev: result.data.previous,
          evolutionNext: result.data.next,
          pageNo: pageNo,
          pageNum: pageNo,
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
    this.fetchUrlforState(
      `${this.evolutionUrl}?offset=${(pageTo - 1) * this.pageLen}&limit=${
        this.pageLen
      }`,
      pageTo
    );
  }

  render() {
    const {
      evolutionList,
      evolutionPrev,
      evolutionNext,
      pageNo,
      pageCount,
      pageNum,
    } = this.state;
    const pageTurnerStruct =
      evolutionList.length !== 0
        ? {
            isFirst: evolutionPrev == null,
            isLast: evolutionNext == null,
            fromNo: getPokeIdFromUrl(evolutionList[0].url),
            toNo: getPokeIdFromUrl(evolutionList[evolutionList.length - 1].url),
            pageNo: pageNo,
            pageCount: pageCount,
            pageNum: pageNum,
          }
        : {};
    return (
      <Fragment>
        <div className="evolution-card-list">
          {evolutionList.length
            ? evolutionList.map((value) => {
                return <EvolutionCards key={value.url} evoUrl={value.url} />;
              })
            : null}
        </div>
        {evolutionList.length ? (
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

export default EvolutionPage;

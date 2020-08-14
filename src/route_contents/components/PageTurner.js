import React, { Component } from "react";
import FontAwesomeIcon from "../../FontAwesome";
import "./PageTurner.scss";

class PageTurner extends Component {
  render() {
    const struct = this.props.struct;
    return (
      <div className="cards-page-turner">
        <button
          className="cards-page-btn"
          onClick={() => {
            this.props.onPageChange("prev");
          }}
          disabled={struct.isFirst}
        >
          <FontAwesomeIcon icon={["fas", "angle-double-left"]} size="3x" />
        </button>
        <div className="cards-page-desc">
          <div className="cards-page-sec">
            <span className="poke-range">
              #<span>{struct.fromNo}</span>&nbsp;&minus;&nbsp;#
              <span>{struct.toNo}</span>
            </span>
          </div>
          <div className="cards-page-sec">
            <span className="page-count">
              <span>
                <input
                  className="page-field"
                  value={struct.pageNum}
                  onChange={this.props.onPageNumEntered}
                  onKeyPress={this.props.onKeyPress}
                />
              </span>
              /<span>{struct.pageCount}</span>
            </span>
          </div>
        </div>
        <button
          className="cards-page-btn"
          onClick={() => {
            this.props.onPageChange("next");
          }}
          disabled={struct.isLast}
        >
          <FontAwesomeIcon icon={["fas", "angle-double-right"]} size="3x" />
        </button>
      </div>
    );
  }
}

export default PageTurner;

import React, { Component } from "react";

class SidePanelBrand extends Component {
  render() {
    return (
      <div className="side-panel-brand">
        <a className="brand-link" href="/">
          <svg className="brand-icon" viewBox="0 0 384 384">
            <circle cx="192" cy="192" r="192" fill="black" />
            <circle cx="192" cy="192" r="175" fill="white" />
            <circle
              cx="192"
              cy="210"
              r="70"
              fill="none"
              stroke="black"
              strokeWidth="22"
            />
            <path
              fill="#ff2525e3"
              d="M367.988,175.064h-0.08c0,0-27.28,27.52-95.36,32.48c-1.36-42.88-36.56-77.2-79.76-77.2
		s-78.4,34.32-79.76,77.2c-68.08-4.96-95.36-32.48-95.36-32.48h-0.08c8.72-89.04,83.92-158.64,175.2-158.64
      S359.268,86.024,367.988,175.064z"
            />
            <path
              d="M262,210 Q330,210 380,170"
              stroke="black"
              strokeWidth="20"
            />
            <path d="M122,210 Q54,210 4,170" stroke="black" strokeWidth="20" />
            <circle cx="192" cy="210" r="45" fill="black" />
            <circle cx="192" cy="210" r="25" fill="white" />
          </svg>
        </a>
      </div>
    );
  }
}

export default SidePanelBrand;

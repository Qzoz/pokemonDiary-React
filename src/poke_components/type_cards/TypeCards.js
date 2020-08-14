import React, { Component } from "react";
import Image, { Shimmer } from "react-shimmer";
import "./TypeCards.scss";
import FontAwesomeIcon from "../../FontAwesome";
import { Link } from "react-router-dom";
import { ThemeConsumer } from "../../misc/ThemeContext";
import { typeIconMap } from "../../misc/IconData";

class TypeCards extends Component {
  constructor(props) {
    super(props);
    this.isDemo = props.isDemo ? props.isDemo : false;
  }

  render() {
    const struct = this.props.struct;
    const imgProps = {
      className: "type-img",
    };
    const lowerName = struct.name.toLowerCase();
    return (
      <div className={`type-card type-${lowerName} shade-on-hover`}>
        <div className="type-head">
          <div className="type-image-cont">
            <Image
              NativeImgProps={imgProps}
              src={typeIconMap[lowerName]}
              fallback={getShimmer()}
              errorFallback={() => getShimmer()}
            />
          </div>
          <p className="type-name">
            {struct.name}&nbsp;
            {this.isDemo ? null : (
              <ThemeConsumer>
                {({ onThemeChange }) => {
                  return (
                    <Link
                      to={`/type/${lowerName}`}
                      onClick={() => onThemeChange(struct.name)}
                    >
                      <FontAwesomeIcon
                        className="type-info-btn"
                        icon={["fas", "info-circle"]}
                      />
                    </Link>
                  );
                }}
              </ThemeConsumer>
            )}
          </p>
          {this.isDemo ? null : (
            <ThemeConsumer>
              {({ onThemeChange }) => {
                return (
                  <Link
                    onClick={() => onThemeChange(struct.name)}
                    to={`/type/${lowerName}/pokemons`}
                    className="type-poke-btn"
                  >
                    Pokemon/s
                  </Link>
                );
              }}
            </ThemeConsumer>
          )}
        </div>
      </div>
    );
  }
}

const getShimmer = () => <Shimmer height={128} width={128} />;

export default TypeCards;

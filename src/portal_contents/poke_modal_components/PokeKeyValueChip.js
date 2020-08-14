import React from "react";
import "./PokeKeyValueChip.scss";

const PokeKeyValueChip = (props) => {
  const isTagNum = props.isTagNum ? true : false;
  const isValNum = props.isValNum ? true : false;
  const tagPreffixIfNum = props.tagPreffix ? props.tagPreffix : "";
  const valPreffixIfNum = props.valPreffix ? props.valPreffix : "";
  const valExt = props.valExt ? props.valExt : null;
  return (
    <div
      className={`${
        props.isSingle ? "poke-key-val-chip" : "poke-key-val-chip-d"
      }`}
    >
      {isTagNum ? (
        <p className="mono-font">
          {tagPreffixIfNum}
          <span>{props.tag}</span>
        </p>
      ) : (
        <p className={valExt ? "has-ext": "not-ext"}>
          <span>{props.tag}</span>
          {!props.isSingle && valExt ? <span>{valExt}</span> : null}
        </p>
      )}
      {isValNum ? (
        <p className="mono-font">
          {valPreffixIfNum}
          <span>{props.val}</span>
        </p>
      ) : (
        <p>{props.val}</p>
      )}
    </div>
  );
};

export default PokeKeyValueChip;

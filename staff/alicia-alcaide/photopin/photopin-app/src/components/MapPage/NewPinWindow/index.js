import React from "react";
import PropTypes from "prop-types";
import { placeType } from "../../../types";

const NewPinWindow = props => {
  const { place, onAddPinHere } = props;

  const NewPinWindowStyle = {
    position: "relative",
    bottom: 150,
    left: "-45px",
    width: 220,
    backgroundColor: "white",
    boxShadow: "0 2px 7px 1px rgba(0, 0, 0, 0.3)",
    padding: 10,
    fontSize: 14,
    zIndex: 100
  };

  return (
    <div style={NewPinWindowStyle}>
      <div style={{ fontSize: 16 }}>{place.title}</div>
      <button type="button" onClick={onAddPinHere}>
        Add pin here
      </button>
    </div>
  );
};

NewPinWindow.propTypes = {
  place: placeType,
  onAddPinHere: PropTypes.func.isRequired
};

export default NewPinWindow;

import React from "react";
import PropTypes from "prop-types";
import { placeType } from "../../../types";

const InfoWindow = props => {
  const { place } = props;

  const infoWindowStyle = {
    position: "relative",
    bottom: 100,
    left: "-45px",
    width: 220,
    backgroundColor: "white",
    boxShadow: "0 2px 7px 1px rgba(0, 0, 0, 0.3)",
    padding: 10,
    fontSize: 14,
    zIndex: 500
  };

  return (
    <div style={infoWindowStyle}>
      <div style={{ fontSize: 16 }}>{place.title}</div>
      <div style={{ fontSize: 14, color: "grey" }}>{place.collection}</div>
      <button
        type="button"
        onClick={e => {
          e.stopPropagation();
          props.onCancel(place.id);
        }}
      >
        X
      </button>
      <button
        type="button"
        onClick={e => {
          e.stopPropagation();
          props.onEdit(place);
        }}
      >
        E
      </button>
      <button
        type="button"
        onClick={e => {
          e.stopPropagation();
          props.onDelete(place.id);
        }}
      >
        D
      </button>
    </div>
  );
};

InfoWindow.propTypes = {
  place: placeType,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default InfoWindow;

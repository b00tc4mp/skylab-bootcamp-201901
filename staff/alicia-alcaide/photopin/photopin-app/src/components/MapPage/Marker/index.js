import React from "react";
import PropTypes from "prop-types";
import { placeType } from "../../../types";
import InfoWindow from "../InfoWindow";

const Marker = props => {
  const markerStyle = {
    border: "1px solid white",
    borderRadius: "50%",
    height: 10,
    width: 10,
    backgroundColor: props.place.showInfo ? "red" : "blue",
    cursor: "pointer",
    zIndex: 10
  };

  return (
    <>
      <div
        style={markerStyle}
        alt={props.place.text}
        {...(props.onClick ? { onClick: props.onClick } : {})}
      />
      {props.place.showInfo && <InfoWindow place={props.place} />}
    </>
  );
};

Marker.defaultProps = {
  onClick: null
};

Marker.propTypes = {
  onClick: PropTypes.func.isRequired,
  place: placeType.isRequired
};

export default Marker;

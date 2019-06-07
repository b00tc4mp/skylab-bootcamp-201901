import React from "react";
import PropTypes from "prop-types";

const InfoWindow = props => {
  const { place } = props;

  const infoWindowStyle = {
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
    <div style={infoWindowStyle}>
      <div style={{ fontSize: 16 }}>{place.title}</div>
      <div style={{ fontSize: 14, color: "grey" }}>{place.collection}</div>
    </div>
  );
};

InfoWindow.propTypes = {
  place: PropTypes.object.isRequired
};

export default InfoWindow;

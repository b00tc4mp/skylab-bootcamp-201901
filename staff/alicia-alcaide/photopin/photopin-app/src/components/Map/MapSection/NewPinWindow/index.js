import React from "react";
import PropTypes from "prop-types";
import { placeType } from "../../../../types";
import literals from "./literals";
import iconPin from "../../../../assets/icons/icon_pin.png";
import iconClose from "../../../../assets/icons/icon_close.png";

const NewPinWindow = props => {
  const { lang, place, onAddPinHere } = props;

  const NewPinWindowStyle = {
    position: "relative",
    bottom: 220,
    left: "-45px",
    width: 240,
    backgroundColor: "white",
    boxShadow: "0 2px 7px 1px rgba(0, 0, 0, 0.3)",
    padding: 10,
    fontSize: 14,
    zIndex: 100
  };

  const stopPropagation = e => e.stopPropagation();

  const { location, latitude, longitude } = literals[lang];

  return (
    <div
      className="uk-flex  uk-flex-column uk-flex-center uk-flex-middle"
      onClick={stopPropagation}
      style={NewPinWindowStyle}
    >
      {place.title && <div className="card-title uk-text-center mini-margin-top mini-margin-bottom">{place.title}</div>}
      <div className="uk-container uk-margin-remove-top uk-padding-remove-left uk-padding-remove-right uk-align-center uk-text-meta mini-margin-bottom">
        <p className="uk-margin-remove-bottom uk-text-bold"> {location}</p>
        <p className="uk-margin-remove-bottom uk-margin-remove-top">
          {latitude}
          {place.geometry.location.lat}
        </p>
        <p className="uk-margin-remove-bottom uk-margin-remove-top">
          {longitude}
          {place.geometry.location.lat}
        </p>
      </div>
      <div>
        <button className="uk-button uk-button-default uk-button-small" type="button" onClick={onAddPinHere}>
          <img className="" src={iconPin} height="15" width="15" alt="" />
        </button>
        <button
          className="uk-button uk-button-default uk-button-small"
          type="button"
          onClick={() => props.onCancel(place.id)}
        >
          <img className="" src={iconClose} height="18" width="18" alt="" />
        </button>
      </div>
    </div>
  );
};

NewPinWindow.propTypes = {
  lang: PropTypes.string.isRequired,
  place: placeType,
  onAddPinHere: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default NewPinWindow;

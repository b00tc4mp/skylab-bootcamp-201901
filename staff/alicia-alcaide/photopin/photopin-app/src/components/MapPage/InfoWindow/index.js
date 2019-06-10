import React from "react";
import PropTypes from "prop-types";
import { placeType } from "../../../types";
import "./index.css";
import iconShow from "../../../assets/icons/icon_eye.png";
import iconEdit from "../../../assets/icons/icon_pencil.png";
import iconDelete from "../../../assets/icons/icon_trash.png";
import iconCancel from "../../../assets/icons/icon_undo_back.png";

const InfoWindow = props => {
  const { place } = props;

  const infoWindowStyle = {
    position: "relative",
    bottom: 200,
    left: "-85px",
    width: 220,
    backgroundColor: "white",
    boxShadow: "0 2px 7px 1px rgba(0, 0, 0, 0.3)",
    padding: 10,
    fontSize: 14,
    zIndex: 2
  };

  return (
    <div className="uk-flex uk-flex-column uk-flex-center uk-flex-middle" style={infoWindowStyle}>
      {place.urlImage && (
        <div className="uk-card-media-top containnerCardImg">
          <img className="uk-align-center containnerCardImg__img" src={place.urlImage} height="" width="" alt="" />
        </div>
      )}
      <div className="card-title uk-text-center mini-margin-top mini-margin-bottom">{place.title}</div>
      <div className="uk-container uk-margin-remove-top uk-padding-remove-left uk-padding-remove-right uk-align-center uk-text-meta mini-margin-bottom">
        <p>{place.description}</p>
      </div>
      <div>
        <button
          className="uk-button uk-button-default uk-button-small"
          type="button"
          onClick={e => {
            e.stopPropagation();
            props.onShow(place.id);
          }}
        >
          <img className="" src={iconShow} height="18" width="18" alt="" />
        </button>
        <button
          className="uk-button uk-button-default uk-button-small"
          type="button"
          onClick={e => {
            e.stopPropagation();
            props.onEdit(place);
          }}
        >
          <img className="" src={iconEdit} height="15" width="15" alt="" />
        </button>
        <button
          className="uk-button uk-button-default uk-button-small"
          type="button"
          onClick={e => {
            e.stopPropagation();
            props.onDelete(place.id);
          }}
        >
          <img className="" src={iconDelete} height="15" width="15" alt="" />
        </button>
        <button
          className="uk-button uk-button-default uk-button-small"
          type="button"
          onClick={e => {
            e.stopPropagation();
            props.onCancel(place.id);
          }}
        >
          <img className="" src={iconCancel} height="18" width="18" alt="" />
        </button>
      </div>
    </div>
  );
};

InfoWindow.propTypes = {
  place: placeType,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onShow: PropTypes.func.isRequired
};

export default InfoWindow;

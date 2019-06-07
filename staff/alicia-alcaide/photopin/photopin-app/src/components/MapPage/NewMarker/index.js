import React, { useState } from "react";
import PropTypes from "prop-types";
import NewPinForm from "../NewPinForm";
import NewPinWindow from "../NewPinWindow";
import { placeType } from "../../../types";

const NewMarker = props => {
  const [showNewPinForm, setShowNewPinForm] = useState(false);

  const markerStyle = {
    border: "1px solid white",
    borderRadius: "50%",
    height: 10,
    width: 10,
    backgroundColor: "violet",
    cursor: "pointer",
    zIndex: 10
  };

  const handleAddNewPinHere = e => {
    e.preventDefault();
    e.stopPropagation();
    setShowNewPinForm(true);
  };

  const handleCancel = () => {
    setShowNewPinForm(false);
    props.onCancel && props.onCancel();
  };

  return (
    <>
      <div
        style={markerStyle}
        alt={props.place.title}
        {...(props.onClick ? { onClick: props.onClick } : {})}
      />
      {showNewPinForm ? (
        <NewPinForm
          place={props.place}
          onNewPin={props.onNewPin}
          onCancel={handleCancel}
          lang={props.lang}
          mapCollections={props.mapCollections}
        />
      ) : (
          <NewPinWindow
            place={props.place}
            onAddPinHere={handleAddNewPinHere}
            lang={props.lang}
            mapCollections={props.mapCollections}
          />
        )}
    </>
  );
};

NewMarker.defaultProps = {
  onClick: null
};

NewMarker.propTypes = {
  place: placeType.isRequired,
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  onNewPin: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  mapCollections: PropTypes.arrayOf(PropTypes.string).isRequired,
  lang: PropTypes.string.isRequired
};

export default NewMarker;

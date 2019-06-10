import React, { useState } from "react";
import PropTypes from "prop-types";
import PinForm from "../PinForm";
import NewPinWindow from "../NewPinWindow";
import { placeType } from "../../../types";

const NewMarker = props => {
  const [showPinForm, setShowPinForm] = useState(false);

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
    setShowPinForm(true);
    props.onPinFormOpen();
  };

  const handleFormCancelled = () => {
    setShowPinForm(false);
    props.onPinFormClosed();
  };

  return (
    <>
      <div style={markerStyle} alt={props.place.title} {...(props.onClick ? { onClick: props.onClick } : {})} />
      {showPinForm ? (
        <PinForm
          place={props.place}
          onSubmit={props.onNewPinSubmitted}
          onCancel={handleFormCancelled}
          lang={props.lang}
          mapCollections={props.mapCollections}
        />
      ) : (
          <NewPinWindow
            lang={props.lang}
            place={props.place}
            onAddPinHere={handleAddNewPinHere}
            onCancel={props.onNewPinWindowClosed}
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
  onNewPinSubmitted: PropTypes.func.isRequired,
  onPinFormOpen: PropTypes.func.isRequired,
  onPinFormClosed: PropTypes.func.isRequired,
  onNewPinWindowClosed: PropTypes.func.isRequired,
  mapCollections: PropTypes.arrayOf(PropTypes.string).isRequired,
  lang: PropTypes.string.isRequired
};

export default NewMarker;

import React, { useState } from "react";
import PropTypes from "prop-types";
import { placeType } from "../../../types";
import InfoWindow from "../InfoWindow";
import PinForm from "../PinForm";

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

  const [showPinForm, setShowPinForm] = useState(false);

  const handleEdit = () => {
    setShowPinForm(true);
  };

  const handleFormCancel = () => setShowPinForm(false);

  return (
    <>
      {showPinForm && (
        <PinForm
          place={props.place}
          onSubmit={props.onEditPinSubmitted}
          onCancel={handleFormCancel}
          lang={props.lang}
          mapCollections={props.mapCollections}
        />
      )}
      <div style={markerStyle} alt={props.place.text} />
      {props.place.showInfo && (
        <InfoWindow
          place={props.place}
          onEdit={handleEdit}
          onDelete={props.onPinDelete}
          onCancel={props.onInfoWindowClosed}
        />
      )}
    </>
  );
};

Marker.propTypes = {
  place: placeType.isRequired,
  onPinFormOpen: PropTypes.func.isRequired,
  onEditPinSubmitted: PropTypes.func.isRequired,
  onInfoWindowClosed: PropTypes.func.isRequired,
  onPinDelete: PropTypes.func.isRequired,
  mapCollections: PropTypes.arrayOf(PropTypes.string).isRequired,
  lang: PropTypes.string.isRequired
};

export default Marker;

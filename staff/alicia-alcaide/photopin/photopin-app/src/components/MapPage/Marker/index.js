import React, { useState } from "react";
import PropTypes from "prop-types";
import { placeType } from "../../../types";
import InfoWindow from "../InfoWindow";
import PinForm from "../PinForm";
import "./index.css";
import pinBlue from "../../../assets/icons/icon_pin_blue.png";
import pinRed from "../../../assets/icons/icon_pin_red.png";

const Marker = props => {
  const [showPinForm, setShowPinForm] = useState(false);

  const handleEdit = () => {
    setShowPinForm(true);
    props.onPinFormOpen();
  };

  const handleShow = () => {
    setShowPinForm(true);
  };

  const handleFormSubmitted = place => {
    setShowPinForm(false);
    props.onEditPinSubmitted(place);
  };

  const handleFormCancel = () => {
    setShowPinForm(false);
    props.onPinFormClosed();
  };

  return (
    <>
      {showPinForm && (
        <PinForm
          place={props.place}
          onSubmit={handleFormSubmitted}
          onCancel={handleFormCancel}
          lang={props.lang}
          mapCollections={props.mapCollections}
        />
      )}
      <img className="marker-default" src={props.place.showInfo ? pinRed : pinBlue} height="20" width="20" alt="Pin" />
      {props.place.showInfo && (
        <InfoWindow
          place={props.place}
          onEdit={handleEdit}
          onDelete={props.onPinDelete}
          onCancel={props.onInfoWindowClosed}
          onShow={handleShow}
        />
      )}
    </>
  );
};

Marker.propTypes = {
  place: placeType.isRequired,
  onPinFormOpen: PropTypes.func.isRequired,
  onPinFormClosed: PropTypes.func.isRequired,
  onEditPinSubmitted: PropTypes.func.isRequired,
  onInfoWindowClosed: PropTypes.func.isRequired,
  onPinDelete: PropTypes.func.isRequired,
  mapCollections: PropTypes.arrayOf(PropTypes.string).isRequired,
  lang: PropTypes.string.isRequired
};

export default Marker;

import React, { useState } from "react";
import PropTypes from "prop-types";
import PinForm from "../PinForm";
import NewPinWindow from "../NewPinWindow";
import { placeType } from "../../../../types";
import "./index.css";
import pinYellow from "../../../../assets/icons/icon_pin_yellow.png";

const NewMarker = props => {
  const [showPinForm, setShowPinForm] = useState(false);

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
      <img className="new-marker-default" src={pinYellow} height="20" width="20" alt="Pin" />
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

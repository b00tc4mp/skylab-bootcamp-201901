import React from "react";
import PropTypes from "prop-types";
import { pinType } from "../../../../types";

const CollectionPin = props => {
  const handleSelect = () => props.onSelect(props.pin.id);
  const handleDelete = () => props.onDelete(props.pin.id);

  return (
    <li key={props.pin.id}>
      <div>
        <a onClick={handleSelect}>{props.pin.title}</a>
        <button onClick={handleDelete}>D</button>
      </div>
    </li>
  );
};

CollectionPin.propTypes = {
  pin: pinType.isRequired,
  onSelect: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default CollectionPin;

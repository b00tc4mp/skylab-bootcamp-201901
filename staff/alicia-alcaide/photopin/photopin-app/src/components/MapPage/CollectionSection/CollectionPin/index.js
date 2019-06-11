import React from "react";
import PropTypes from "prop-types";
import { pinType } from "../../../../types";
import './index.css'
import iconPinUp from "../../../../assets/icons/icon_pin_up.png";

const CollectionPin = props => {
  const handleSelect = e => {
    e.stopPropagation();
    props.onSelect(props.pin.id);
  };
  const handleDelete = e => {
    e.stopPropagation();
    props.onDelete(props.pin.id);
  };

  return (
    <li key={props.pin.id} className="uk-flex">
      <div className="">
        <img className="" src={iconPinUp} height="15" width="15" alt="" />
        <a onClick={handleSelect}> {props.pin.title}</a>
      </div>
      <div className="">
        {/* <button className="uk-button uk-button-default uk-button-small" type="button" onClick={handleDelete}>
          <img className="" src={iconDelete} height="18" width="18" alt="" />
        </button> */}
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

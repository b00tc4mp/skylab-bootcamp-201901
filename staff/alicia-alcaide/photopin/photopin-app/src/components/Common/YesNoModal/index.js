import React from "react";
import { PropTypes } from "prop-types";
import literals from "./literals";
import './index.css';
import Modal from "react-modal";

class YesNoModal extends React.Component {
  state = { showModal: false };

  componentDidMount() {
    this.setState({ showModal: true });
  }

  handleNo = e => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ showModal: false });
    this.props.onNo();
  };

  handleYes = e => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ showModal: false });
    this.props.onYes();
  };

  stopPropagation = e => e.stopPropagation;

  render() {
    const { state, props, handleYes, handleNo } = this;
    const literal = literals[props.lang];

    return (
      <Modal isOpen={state.showModal} onRequestClose={handleNo} ariaHideApp={false} className="modal-yesno-page modal-yesno">
        <div className="uk-container custom-pading-medium">
          <h2>{props.title}</h2>
          <h4>{props.desc}</h4>
          <div className="uk-flex uk-flex-center">
            <button className="custom-form-button-small" onClick={handleYes}>{literal.yes}</button>
            <button className="custom-form-button-small" onClick={handleNo}>{literal.no}</button>
          </div>
        </div>
      </Modal>
    );
  }
}

YesNoModal.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  lang: PropTypes.string.isRequired,
  onYes: PropTypes.func.isRequired,
  onNo: PropTypes.func.isRequired
};

export default YesNoModal;

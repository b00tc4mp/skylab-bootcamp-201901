import React from "react";
import { PropTypes } from "prop-types";
import literals from "./literals";
import Modal from "react-modal";

const modalStyles = {
  content: {
    position: "relative",
    bottom: 150,
    left: 50,
    width: 280,
    height: 420,
    backgroundColor: "white",
    boxShadow: "0 2px 7px 1px rgba(0, 0, 0, 0.3)",
    padding: 10,
    fontSize: 14
  }
};

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
      <Modal isOpen={state.showModal} onRequestClose={handleNo} style={modalStyles} ariaHideApp={false}>
        <div className="modal">
          <h2>{props.title}</h2>
          <h3>{props.desc}</h3>
          <div>
            <button onClick={handleYes}>{literal.yes}</button>
            <button onClick={handleNo}>{literal.no}</button>
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

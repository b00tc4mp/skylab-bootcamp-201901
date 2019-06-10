import React from "react";
import { PropTypes, string } from "prop-types";
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

class CollectionForm extends React.Component {
  state = { showModal: false };

  componentDidMount() {
    this.props.collection && this.setState({ showModal: true });
  }

  handleCloseModal = e => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ showModal: false });
    this.props.onCancel();
  };

  handleSubmit = e => {
    e.preventDefault();
    e.stopPropagation();

    //TODO: validar los campos del formulario

    const newCollection = {
      title: e.target.title.value
    };

    this.setState({ showModal: false });
    this.props.onSubmit(newCollection);
  };

  stopPropagation = e => e.stopPropagation;

  isEditing = () => this.props.collection.title && this.props.collection.title !== "";

  render() {
    const {
      state: { showModal },
      props: { collection, lang },
      handleCloseModal,
      handleSubmit,
      isEditing
    } = this;

    const { title, add, update, cancel, headerAdd, headerUpdate, placeholderNewCol } = literals[lang];

    return (
      <>
        {collection && (
          <Modal isOpen={showModal} onRequestClose={handleCloseModal} style={modalStyles} ariaHideApp={false}>
            <div className="modal">
              <h2>{isEditing() ? headerUpdate : headerAdd}</h2>
              <form onSubmit={handleSubmit}>
                <span>{title}</span>
                <input
                  type="text"
                  name="title"
                  defaultValue={isEditing() ? collection.title : placeholderNewCol}
                  autoFocus
                />
                <br />
                <br />
                <div>
                  <button type="submit">{isEditing() ? update : add}</button>
                  <button type="button" onClick={this.handleCloseModal}>
                    {cancel}
                  </button>
                </div>
                {/* {error && <span>{error}</span>} */}
              </form>
            </div>
          </Modal>
        )}
      </>
    );
  }
}

CollectionForm.propTypes = {
  collection: PropTypes.object.isRequired,
  lang: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default CollectionForm;

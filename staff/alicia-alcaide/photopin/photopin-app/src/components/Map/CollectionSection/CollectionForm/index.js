import React from "react";
import { PropTypes } from "prop-types";
import literals from "./literals";
import Modal from "react-modal";
import "./index.css";

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
          <Modal
            isOpen={showModal}
            onRequestClose={handleCloseModal}
            ariaHideApp={false}
            className="modal-collection-page modal-collection"
          >
            <div className="uk-container custom-pading-medium">
              <h2>{isEditing() ? headerUpdate : headerAdd}</h2>
              <form onSubmit={handleSubmit}>
                <span>{title}</span>
                <input
                  className="uk-input uk-form-width-large"
                  type="text"
                  name="title"
                  defaultValue={isEditing() ? collection.title : ""}
                  placeholder={placeholderNewCol}
                  autoFocus
                  required
                />
                <br />
                <br />
                <div className="uk-flex uk-flex-center">
                  <button className="custom-form-button-small" type="submit">
                    {isEditing() ? update : add}
                  </button>
                  <button className="custom-form-button-small" type="button" onClick={this.handleCloseModal}>
                    {cancel}
                  </button>
                </div>
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

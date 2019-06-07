import React from "react";
import { PropTypes, string } from "prop-types";
import literals from "./literals";
import Modal from "react-modal";
import { placeType } from "../../../types";


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

class NewPinForm extends React.Component {
  state = { showModal: false };

  componentDidMount() {
    this.props.place && this.setState({ showModal: true });
  }

  componentDidUpdate(prevProps) {
    //  this.props.place !== prevProps.place && this.setState({ showModal: true });
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
    debugger

    const newPin = {
      title: e.target.title.value,
      description: e.target.description.value,
      urlImage: e.target.urlImage.value,
      bestTimeOfYear: e.target.bestTimeYear.value,
      bestTimeOfDay: e.target.bestTimeDay.value,
      photographyTips: e.target.photoTips.value,
      travelInformation: e.target.travelInfo.value,
      coordinates: {
        latitude: this.props.place.geometry.location.lat,
        longitude: this.props.place.geometry.location.lng
      },
      collectionSel: e.target.collectionSel.value
    };

    this.setState({ showModal: false });
    this.props.onNewPin(newPin);
  };

  render() {
    const {
      state: { showModal },
      props: { mapCollections, lang, onNewPin, place },
      handleCloseModal,
      handleSubmit
    } = this;

    const {
      title,
      description,
      urlImage,
      bestTimeYear,
      bestTimeDay,
      photoTips,
      travelInfo,
      collection,
      add,
      cancel
    } = literals[lang];

    return (
      <>
        {place && mapCollections && onNewPin && (
          <Modal
            isOpen={showModal}
            onRequestClose={handleCloseModal}
            style={modalStyles}
          >
            <div className="modal">
              <form onSubmit={handleSubmit}>
                <span>{title}</span>
                <input type="text" name="title" autoFocus />
                <br />
                <span>{description}</span>
                <input type="text" name="description" />
                <br />
                <span>{urlImage}</span>
                <input type="text" name="urlImage" />
                <br />
                <span>{bestTimeYear}</span>
                <input type="text" name="bestTimeYear" />
                <br />
                <span>{bestTimeDay}</span>
                <input type="text" name="bestTimeDay" />
                <br />
                <span>{photoTips}</span>
                <textarea type="text" name="photoTips" rows="2" cols="25" />
                <br />
                <span>{travelInfo}</span>
                <textarea type="text" name="travelInfo" rows="2" cols="25" />
                <br />
                <span>{collection}</span>
                <select name="collectionSel">
                  {mapCollections.map(collection => (
                    <option value={collection} key={collection}>
                      {collection}
                    </option>
                  ))}
                </select>
                <br />
                <div>
                  <button type="submit">{add}</button>
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

NewPinForm.propTypes = {
  place: placeType,
  mapCollections: PropTypes.arrayOf(string).isRequired,
  lang: PropTypes.string.isRequired,
  onNewPin: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default NewPinForm;

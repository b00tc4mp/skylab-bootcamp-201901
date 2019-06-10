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

class PinForm extends React.Component {
  state = { showModal: false };

  componentDidMount() {
    this.props.place && this.setState({ showModal: true });
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

    const newPin = {
      id: this.props.place.id,
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
      collection: this.isEditing() ? this.props.place.collection : e.target.collectionSel.value
    };

    this.setState({ showModal: false });
    this.props.onSubmit(newPin);
  };

  stopPropagation = e => e.stopPropagation;

  isEditing = () => this.props.place.id && this.props.place.id !== "";

  render() {
    const {
      state: { showModal },
      props: { mapCollections, lang, place },
      handleCloseModal,
      handleSubmit,
      isEditing
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
      update,
      cancel,
      headerAdd,
      headerUpdate
    } = literals[lang];

    return (
      <>
        {place && mapCollections && (
          <Modal isOpen={showModal} onRequestClose={handleCloseModal} style={modalStyles} ariaHideApp={false}>
            <div className="modal">
              <h2>{isEditing() ? headerUpdate : headerAdd}</h2>
              <form onSubmit={handleSubmit}>
                <span>{title}</span>
                <input type="text" name="title" defaultValue={place.title} autoFocus />
                <br />
                <span>{description}</span>
                <input type="text" name="description" defaultValue={place.description} />
                <br />
                <span>{urlImage}</span>
                <input type="text" name="urlImage" defaultValue={place.urlImage} />
                <br />
                <span>{bestTimeYear}</span>
                <input type="text" name="bestTimeYear" defaultValue={place.bestTimeOfYear} />
                <br />
                <span>{bestTimeDay}</span>
                <input type="text" name="bestTimeDay" defaultValue={place.bestTimeOfDay} />
                <br />
                <span>{photoTips}</span>
                <textarea type="text" name="photoTips" rows="2" cols="25" defaultValue={place.photographyTips} />
                <br />
                <span>{travelInfo}</span>
                <textarea type="text" name="travelInfo" rows="2" cols="25" defaultValue={place.travelInformation} />
                <br />
                {!isEditing() && (
                  <>
                    <span>{collection}</span>
                    <select name="collectionSel" defaultValue={place.collection}>
                      {mapCollections.map(collection => (
                        <option value={collection} key={collection}>
                          {collection}
                        </option>
                      ))}
                    </select>
                  </>
                )}
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

PinForm.propTypes = {
  place: placeType,
  mapCollections: PropTypes.arrayOf(string).isRequired,
  lang: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default PinForm;

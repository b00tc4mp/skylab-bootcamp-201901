import React from "react";
import { PropTypes, string } from "prop-types";
import { toast } from "react-toastify";
import literals from "./literals";
import validate from "photopin-validate";
import Modal from "react-modal";
import { placeType } from "../../../types";
import placeholderImage from "../../../assets/images/placeholder-image.png";
import './index.css'


class PinForm extends React.Component {
  state = { showModal: false, urlImage: null, errors: {} };

  componentDidMount() {
    this.props.place && this.setState({ showModal: true, urlImage: this.props.place.urlImage || null });

    if (this.props.mapCollections.length === 0) {
      toast.error(literals[this.props.lang].errorMsg);
      this.setState({ showModal: false });
      this.props.onCancel();
    }
  }

  handleCloseModal = e => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ showModal: false });
    this.props.onCancel();
  };

  handleChangeImage = e => {
    let changedUrlImage = null;
    if (e.target.value !== "") {
      try {
        validate.url(e.target.value);
        changedUrlImage = e.target.value;
      } catch {
        changedUrlImage = null;
      }
    }
    this.setState({ urlImage: changedUrlImage });
  };

  handleSubmit = e => {
    e.preventDefault();
    e.stopPropagation();

    const validateErrors = {};
    if (!e.target.title.value || e.target.title.value === "") validateErrors.title = "Title can not be empty";

    if (e.target.urlImage.value !== "") {
      try {
        validate.url(e.target.urlImage.value);
      } catch {
        validateErrors.urlImage = "This is not a correct url";
      }
    }
    if (Object.keys(validateErrors).length !== 0) {
      this.setState({ errors: validateErrors });
    } else {
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
    }
  };

  stopPropagation = e => e.stopPropagation;

  isEditing = () => this.props.place.id && this.props.place.id !== "";

  render() {
    const {
      state: { showModal },
      props: { mapCollections, lang, place },
      handleCloseModal,
      handleSubmit,
      handleChangeImage,
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
      headerUpdate,
      errorMsg
    } = literals[lang];

    return (
      <>
        {place && mapCollections && (
          <Modal isOpen={showModal} onRequestClose={handleCloseModal} ariaHideApp={false} className="Modal" >
            <div className="modal">
              <h2 className="uk-text-center mini-margin-top uk-margin-remove-bottom">{isEditing() ? headerUpdate : headerAdd}</h2>
              <div className="uk-grid uk-margin-remove-left uk-grid-match uk-center uk-child-width-expand@s" data-uk-grid>
                <div className="uk-card uk-card-default custom-card-body mini-margin-top">
                  <form className="uk-form-stacked" onSubmit={handleSubmit}>
                    <div className="">
                      <label className="" htmlFor="form-stacked-text">
                        {title}
                      </label>
                      {this.state.errors.title && (
                        <span className="uk-text-danger uk-margin-small-left">{this.state.errors.title}</span>
                      )}
                      <div className="uk-form-controls">
                        <input className="custom-input custom-form-width"
                          id="form-stacked-text" type="text" name="title" defaultValue={place.title} autoFocus required />
                      </div>
                    </div>
                    <div className="mini-margin-top">
                      <label className="" htmlFor="form-stacked-text">
                        {description}
                      </label>
                      <div className="uk-form-controls">
                        <input className="custom-input custom-form-width"
                          id="form-stacked-text" type="text" name="description" defaultValue={place.description} />
                      </div>
                    </div>
                    <div className="mini-margin-top">
                      <label className="" htmlFor="form-stacked-text">
                        {urlImage}
                      </label>
                      {this.state.errors.urlImage && (
                        <span className="uk-text-danger uk-margin-small-left">{this.state.errors.urlImage}</span>
                      )}
                      <div className="uk-form-controls">
                        <input className="custom-input custom-form-width"
                          id="form-stacked-text" type="url" name="urlImage" defaultValue={place.urlImage} onChange={handleChangeImage} />
                      </div>
                    </div>
                    <div className="mini-margin-top">
                      <label className="" htmlFor="form-stacked-text">
                        {bestTimeYear}
                      </label>
                      <div className="uk-form-controls">
                        <input className="custom-input custom-form-width"
                          id="form-stacked-text" type="text" name="bestTimeYear" defaultValue={place.bestTimeOfYear} />
                      </div>
                    </div>
                    <div className="mini-margin-top">
                      <label className="" htmlFor="form-stacked-text">
                        {bestTimeDay}
                      </label>
                      <div className="uk-form-controls">
                        <input className="custom-input custom-form-width"
                          id="form-stacked-text" type="text" name="bestTimeDay" defaultValue={place.bestTimeOfDay} />
                      </div>
                    </div>
                    <div className="mini-margin-top">
                      <label className="" htmlFor="form-stacked-text">
                        {photoTips}
                      </label>
                      <div className="uk-form-controls">
                        <textarea className="custom-input custom-form-width"
                          id="form-stacked-text"
                          type="text" name="photoTips" rows="1" cols="25" defaultValue={place.photographyTips} />
                      </div>
                    </div>
                    <div className="mini-margin-top">
                      <label className="" htmlFor="form-stacked-text">
                        {travelInfo}
                      </label>
                      <div className="uk-form-controls">
                        <textarea className="custom-input custom-form-width"
                          id="form-stacked-text"
                          type="text" name="travelInfo" rows="1" cols="25" defaultValue={place.travelInformation} />
                      </div>
                    </div>
                    {!isEditing() && (
                      <div className="mini-margin-top">
                        <label className="" htmlFor="form-stacked-text">
                          {collection}
                        </label>
                        <select className="custom-select"
                          id="form-stacked-text" name="collectionSel" defaultValue={place.collection}>
                          {mapCollections.map(collection => (
                            <option value={collection} key={collection}>
                              {collection}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                    <div className="uk-flex uk-flex-center">
                      <button className="custom-form-button-small" type="submit">{isEditing() ? update : add}</button>
                      <button className="custom-form-button-small" type="button" onClick={this.handleCloseModal}>
                        {cancel}
                      </button>
                    </div>
                  </form>
                </div>
                <div>
                  <div className="uk-card uk-card-default custom-card-body mini-margin-top">
                    <img src={this.state.urlImage ? this.state.urlImage : placeholderImage} width="" height="" alt="" />
                  </div>
                </div>
              </div>
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

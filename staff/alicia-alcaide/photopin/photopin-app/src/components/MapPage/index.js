import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import literals from "./literals";
import logic from "../../logic";
import NavBar from "../NavBar";
import MapSection from "./MapSection";
import CollectionSection from "./CollectionSection";
import YesNoModal from "../Common/YesNoModal";
import iconEdit from "../../assets/icons/icon_pencil.png";
import iconDelete from "../../assets/icons/icon_trash.png";
import "./index.css";

class MapPage extends Component {
  state = {
    pmap: null,
    mapId: this.props.match.params.id,
    newPinId: null,
    selectedPinId: null,
    collectionVisibility: {},
    deletingMap: false
  };

  componentDidMount() {
    logic.isUserLoggedIn && this.fetchMapAndUpdateState(this.state.mapId);
  }

  fetchMapAndUpdateState = async () => {
    try {
      const pmap = await logic.retrieveUserMap(this.state.mapId);
      this.setState({ pmap });
      this.computeCollectionVisibility();
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  computeCollectionVisibility = () => {
    const { pmap } = this.state;
    let collectionVisibility = {};
    if (pmap.collections) {
      pmap.collections.forEach(c => {
        collectionVisibility[c.title] = this.state.collectionVisibility[c.title]
          ? this.state.collectionVisibility[c.title]
          : true;
      });
    }
    this.setState({ collectionVisibility });
  };

  handleCollectionVisibilityToggle = title => {
    const collectionVisibility = { ...this.state.collectionVisibility };
    collectionVisibility[title] = !collectionVisibility[title];
    this.setState({ collectionVisibility });
  };

  handleNewCollection = async title => {
    try {
      await logic.createCollection(this.state.pmap.id, title);
      this.fetchMapAndUpdateState(this.state.mapId);
    } catch (error) {
      this.setState({ error });
    }
  };

  handleCollectionDelete = async title => {
    try {
      await logic.removeCollection(this.state.mapId, title);
      this.fetchMapAndUpdateState(this.state.mapId);
    } catch (error) {
      this.setState({ error });
    }
  };

  handleCollectionEdit = async (oldTitle, newTitle) => {
    try {
      await logic.updateCollection(this.state.mapId, oldTitle, newTitle);
      this.fetchMapAndUpdateState(this.state.mapId);
    } catch (error) {
      this.setState({ error });
    }
  };

  handleDeleteMap = () => {
    this.setState({ deletingMap: true });
  };

  handleEditMap = () => {
    this.setState({ redirectToMapForm: true });
  };

  handleSubmitDeleteMap = async () => {
    this.setState({ deletingMap: false });
    try {
      await logic.removeMap(this.state.mapId);
      this.setState({ redirectToHome: true });
    } catch (error) {
      this.setState({ error });
    }
  };

  handleDeleteMapCancel = () => this.setState({ deletingMap: false });

  handlePinSelect = pinId => {
    this.setState({ selectedPinId: pinId, newPinId: null });
  };

  handleNewPin = async place => {
    if (place !== null) {
      try {
        const pin = {
          title: place.title,
          description: place.description,
          urlImage: place.urlImage,
          bestTimeOfYear: place.bestTimeOfYear,
          bestTimeOfDay: place.bestTimeOfDay,
          photographyTips: place.photographyTips,
          travelInformation: place.travelInformation,
          coordinates: {
            latitude: place.coordinates.latitude,
            longitude: place.coordinates.longitude
          }
        };
        const resp = await logic.createPin(this.state.pmap.id, place.collection, pin);
        this.setState({ newPinId: resp.id, selectedPinId: null });
        this.fetchMapAndUpdateState(this.state.mapId);
      } catch (error) {
        this.setState({ error });
      }
    }
  };

  handlePinDelete = async pinId => {
    try {
      await logic.removePin(pinId);
      this.fetchMapAndUpdateState(this.state.mapId);
    } catch (error) {
      this.setState({ error });
    }
  };

  handlePinEdit = async pin => {
    try {
      await logic.updatePin(
        pin.id,
        pin.title,
        pin.description,
        pin.urlImage,
        pin.bestTimeOfYear,
        pin.bestTimeOfDay,
        pin.photographyTips,
        pin.travelInformation
      );
      this.fetchMapAndUpdateState(this.state.mapId);
      this.setState({ selectedPinId: pin.id, newPinId: null });
    } catch (error) {
      this.setState({ error });
    }
  };

  render() {
    const { state, props } = this;
    const literal = literals[props.lang];

    return (
      <>
        {state.redirectToHome && <Redirect to="/home" />}
        {state.redirectToMapForm && <Redirect to={`/mapform/${this.state.mapId}`} />}
        <div className="map-page">
          <NavBar lang={props.lang} onLogout={props.onLogout} />
          {state.pmap && (
            <h2 className="uk-margin-remove-top">
              <div className="uk-flex uk-column uk-flex-between">
                <div className="uk-left" />
                <div className="uk-middle">{state.pmap.title}</div>
                <div className="uk-right mini-padding-right">
                  <button
                    className="uk-button uk-button-default uk-button-small"
                    type="button"
                    onClick={this.handleEditMap}
                  >
                    <img className="" src={iconEdit} height="18" width="18" alt="" />
                  </button>
                  <button
                    className="uk-button uk-button-default uk-button-small"
                    type="button"
                    onClick={this.handleDeleteMap}
                  >
                    <img className="" src={iconDelete} height="18" width="18" alt="" />
                  </button>
                </div>
              </div>
            </h2>
          )}
          {state.deletingMap && (
            <YesNoModal
              title={literal.deleteMapTitle}
              desc={literal.deleteMapDesc}
              onYes={this.handleSubmitDeleteMap}
              onNo={this.handleDeleteMapCancel}
              lang={props.lang}
            />
          )}
          <div className="custom-flex central-section">
            <section className="custom-flex_items-bar">
              <CollectionSection
                pmap={state.pmap}
                lang={props.lang}
                onNewCollection={this.handleNewCollection}
                onCollectionDelete={this.handleCollectionDelete}
                onCollectionEdit={this.handleCollectionEdit}
                onPinSelect={this.handlePinSelect}
                onPinDelete={this.handlePinDelete}
                onCollectionVisibilityToggle={this.handleCollectionVisibilityToggle}
              />
            </section>
            <section className="custom-flex__content">
              <MapSection
                pmap={state.pmap}
                lang={props.lang}
                onNewPin={this.handleNewPin}
                onPinEdited={this.handlePinEdit}
                onPinDelete={this.handlePinDelete}
                newPinId={state.newPinId}
                selectedPinId={state.selectedPinId}
                visibleCollections={state.collectionVisibility}
              />
            </section>
          </div>
        </div>
      </>
    );
  }
}

MapPage.propTypes = {
  lang: PropTypes.string
};

export default withRouter(MapPage);

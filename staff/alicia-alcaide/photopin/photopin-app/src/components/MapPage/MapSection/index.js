import React, { Component } from "react";
import PropTypes from "prop-types";
import { pmapType } from "../../../types";
import { withRouter } from "react-router-dom";
import MapContainer from "../GoogleMap/MapContainer";

class MapSection extends Component {
  state = {
    places: [],
    mapCollections: []
  };

  componentWillReceiveProps(props) {
    let places = [];
    let mapCollections = [];
    props.pmap &&
      props.pmap.collections &&
      props.pmap.collections.forEach(collection => {
        mapCollections.push(collection.title);
        collection.pins &&
          collection.pins.forEach(pin => {
            places.push({
              id: pin._id,
              title: pin.title,
              description: pin.description,
              urlImage: pin.urlImage,
              bestTimeOfYear: pin.bestTimeOfYear,
              bestTimeOfDay: pin.bestTimeOfDay,
              photographyTips: pin.photographyTips,
              travelInformation: pin.travelInformation,
              collection: collection.title,
              geometry: {
                location: {
                  lat: pin.coordinates.latitude,
                  lng: pin.coordinates.longitude
                }
              },
              visible: props.visibleCollections[collection.title] ? true : false,
              showInfo: this.shouldEnableInfoWidowForPin(props, pin)
            });
          });
      });
    this.setState({ places, mapCollections });
  }

  pinToPlace = pin => {};

  handleMarkerClicked = placeId => {
    this.togglePlaceInfoWindowVisibility(placeId);
  };

  handleMapClicked = e => {
    this.hideAllPlaceInfoWindows();
  };

  hideAllPlaceInfoWindows = () => {
    this.setState(state => {
      state.places.forEach(place => (place.showInfo = false));
      return { places: state.places };
    });
  };

  shouldEnableInfoWidowForPin = (props, pin) => pin._id === props.newPinId || pin._id === props.selectedPinId;

  togglePlaceInfoWindowVisibility = pinIdToToggle => {
    this.setState(state => {
      state.places.forEach(place =>
        pinIdToToggle && place.id === pinIdToToggle ? (place.showInfo = !place.showInfo) : (place.showInfo = false)
      );
      return { places: state.places };
    });
  };

  render() {
    const {
      state: { places, mapCollections },
      props: { lang, onNewPin, onPinEdited, onPinDelete },
      handleMarkerClicked,
      handleMapClicked
    } = this;

    return (
      <MapContainer
        lang={lang}
        places={places}
        onMarkerClick={handleMarkerClicked}
        onMapClick={handleMapClicked}
        onNewPin={onNewPin}
        onPinEdited={onPinEdited}
        onPinDelete={onPinDelete}
        mapCollections={mapCollections}
      />
    );
  }
}

MapSection.propTypes = {
  lang: PropTypes.string.isRequired,
  onNewPin: PropTypes.func.isRequired,
  onPinEdited: PropTypes.func.isRequired,
  onPinDelete: PropTypes.func.isRequired,
  pmap: pmapType,
  newPinId: PropTypes.string,
  selectedPinId: PropTypes.string,
  visibleCollections: PropTypes.object.isRequired
};

export default withRouter(MapSection);

import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import MapContainer from "../GoogleMap/MapContainer";

const MAP_ZOOM_DEFAULT = 6;
const MAP_ZOOM_ON_SEARCH_RESULT = 10;

class MapSection extends Component {
  state = {
    places: [],
    mapCenter: null,
    mapCollections: []
  };

  componentWillReceiveProps(props) {
    const { pmap } = props;
    let places = [];
    let mapCenter = null;
    let mapCollections = [];
    pmap &&
      pmap.collections &&
      pmap.collections.forEach(collection => {
        mapCollections.push(collection.title);
        collection.pins &&
          collection.pins.forEach(pin => {
            places.push({
              id: pin._id,
              title: pin.title,
              collection: collection.title,
              geometry: {
                location: {
                  lat: pin.coordinates.latitude,
                  lng: pin.coordinates.longitude
                }
              },
              showInfo: false
            });
            if (!mapCenter) {
              mapCenter = {
                lat: pin.coordinates.latitude,
                lng: pin.coordinates.longitude
              };
              //mapCenter = [pin.coordinates.latitude, pin.coordinates.longitude]
            }
          });
      });
    this.setState({ places, mapCenter, mapCollections });
  }

  handleMarkerClick = id => {
    this.setState(state => {
      state.places.map(place => {
        place.id === id
          ? (place.showInfo = !place.showInfo)
          : (place.showInfo = false);
      });
      return { places: state.places };
    });
  };

  handleMapClick = e => {
    this.setState(state => {
      state.places.map(place => {
        place.showInfo = false;
      });
      return { places: state.places };
    });
  };

  handleNewPin = pin => {
    this.props.onNewPin(pin);
  };

  render() {
    const {
      state: { places, mapCenter, mapCollections },
      props: { lang },
      handleMarkerClick,
      handleMapClick,
      handleNewPin
    } = this;

    /* TODO: Si se pasa mapCenter por props no pinta el mapa, si se deja 
                por defecto sique funciona 
               center={mapCenter}  */
    return (
      <MapContainer
        lang={lang}
        places={places}
        defaultZoom={MAP_ZOOM_DEFAULT}
        zoomOnSearchResult={MAP_ZOOM_ON_SEARCH_RESULT}
        onMarkerClick={handleMarkerClick}
        onMapClick={handleMapClick}
        onNewPin={handleNewPin}
        mapCollections={mapCollections}
      />
    );
  }
}

MapSection.propTypes = {
  lang: PropTypes.string,
  handleNewPin: PropTypes.func,
  pmap: PropTypes.object
};

export default withRouter(MapSection);

import React from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import GoogleMapReact from "google-map-react";
import SearchBox from "./SearchBox";
import Marker from "../Marker";
import NewMarker from "../NewMarker";
import { placeType } from "../../../types";
import logic from "../../../logic";

const MAP_DEFAULT_ZOOM = 6;
const MAP_DEFAULT_ZOOM_ON_PIN_SELECTED = 6;
const MAP_DEFAULT_ZOOM_ON_SEARCH_RESULT = 10;
const MAP_DEFAULT_CENTER = {
  lat: 63.53331,
  lng: -19.51168
};

class MapContainer extends React.Component {
  state = {
    mapApiLoaded: false,
    mapInstance: null,
    mapApi: null,
    places: [],
    newPlace: null,
    isPinFormOpen: false,
    mapCenter: MAP_DEFAULT_CENTER,
    mapZoom: MAP_DEFAULT_ZOOM
  };

  componentWillReceiveProps(props) {
    const { places } = props;
    this.setState({ places });
    this.state.mapApiLoaded && this.positionMapOnFirstPlace(places);
  }

  apiHasLoaded = (map, maps) => {
    this.setState({
      mapApiLoaded: true,
      mapInstance: map,
      mapApi: maps
    });
    map.setOptions({ draggableCursor: "crosshair" });
    this.positionMapOnFirstPlace(this.state.places);
  };

  positionMapOnFirstPlace = places => {
    if (places && places.length > 0) {
      this.setState({
        mapCenter: places[0].geometry.location,
        mapZoom: MAP_DEFAULT_ZOOM_ON_PIN_SELECTED
      });
    }
  };

  handleSearchResult = gmapPlace => {
    const place = {
      id: "",
      title: gmapPlace.name,
      description: "",
      urlImage: "",
      bestTimeOfYear: "",
      bestTimeOfDay: "",
      photographyTips: "",
      travelInformation: "",
      collection: null,
      showInfo: false,
      geometry: {
        location: {
          lat: gmapPlace.geometry.location.lat(),
          lng: gmapPlace.geometry.location.lng()
        }
      }
    };
    this.setState({ newPlace: place });

    if (place.geometry.viewport) {
      this.state.mapInstance.fitBounds(place.geometry.viewport);
    } else {
      this.state.mapInstance.setCenter(place.geometry.location);
      this.state.mapInstance.setZoom(MAP_DEFAULT_ZOOM_ON_SEARCH_RESULT);
    }
  };

  handlePinFormOpen = pin => {
    this.setState({ isPinFormOpen: true });
  };

  handlePinFormClosed = () => {
    this.setState({ newPlace: null, isPinFormOpen: false });
  };

  handleNewPinSubmitted = place => {
    this.setState({ newPlace: null, isPinFormOpen: false });
    this.props.onNewPin(place);
  };

  handlePinEdited = place => {
    this.setState({ isPinFormOpen: false });
    this.props.onPinEdited(place);
  };

  handleNewPinWindowClosed = placeId => {
    this.setState({ newPlace: null });
    this.handleMapElementClicked(placeId);
  };

  handleInfoWindowClosed = placeId => {
    this.handleMapElementClicked(placeId);
  };

  handleMapElementClicked = key => {
    this.setState({ newPlace: null });
    this.props.onMarkerClick && this.props.onMarkerClick(key);
  };

  handleMapClicked = e => {
    if (this.state.isPinFormOpen) return;
    const place = {
      id: "",
      title: "",
      description: "",
      urlImage: "",
      bestTimeOfYear: "",
      bestTimeOfDay: "",
      photographyTips: "",
      travelInformation: "",
      collection: null,
      showInfo: false,
      geometry: {
        location: {
          lat: e.lat,
          lng: e.lng
        }
      }
    };
    this.setState({ newPlace: place });

    this.props.onMapClick && this.props.onMapClick(e);
  };

  render() {
    const { lang } = this.props;
    const { places, newPlace, mapApiLoaded, mapInstance, mapApi, mapCenter, mapZoom } = this.state;
    return (
      // Important! Always set the container height explicitly
      <>
        {!logic.isUserLoggedIn && <Redirect to="/logout" />}
        <div style={{ height: "calc(100vh - 150px)", width: "calc(100vw - 360px)" }}>
          {mapApiLoaded && !this.state.isPinFormOpen && (
            <SearchBox map={mapInstance} mapApi={mapApi} onSearchResult={this.handleSearchResult} lang={lang} />
          )}
          <GoogleMapReact
            bootstrapURLKeys={{
              key: process.env.REACT_APP_GOOGLE_MAPS_ID,
              libraries: ["places", "geometry"]
            }}
            defaultCenter={MAP_DEFAULT_CENTER}
            defaultZoom={MAP_DEFAULT_ZOOM}
            center={mapCenter}
            zoom={mapZoom}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps)}
            onChildClick={this.handleMapElementClicked}
            onClick={this.handleMapClicked}
            hoverDistance={20}
            options={{ fullscreenControl: false }}
          >
            {places &&
              places.length > 0 &&
              places.map(
                place =>
                  place.visible && (
                    <Marker
                      key={place.id}
                      place={place}
                      text={place.name}
                      lat={place.geometry.location.lat}
                      lng={place.geometry.location.lng}
                      onEditPinSubmitted={this.handlePinEdited}
                      onPinFormOpen={this.handlePinFormOpen}
                      onPinFormClosed={this.handlePinFormClosed}
                      onInfoWindowClosed={this.handleInfoWindowClosed}
                      onPinDelete={this.props.onPinDelete}
                      mapCollections={this.props.mapCollections}
                      lang={this.props.lang}
                    />
                  )
              )}
            {newPlace && (
              <NewMarker
                place={newPlace}
                lat={newPlace.geometry.location.lat}
                lng={newPlace.geometry.location.lng}
                onNewPinSubmitted={this.handleNewPinSubmitted}
                onPinFormOpen={this.handlePinFormOpen}
                onPinFormClosed={this.handlePinFormClosed}
                onNewPinWindowClosed={this.handleNewPinWindowClosed}
                mapCollections={this.props.mapCollections}
                lang={this.props.lang}
              />
            )}
          </GoogleMapReact>
        </div>
      </>
    );
  }
}

MapContainer.propTypes = {
  places: PropTypes.arrayOf(placeType),
  onMapClick: PropTypes.func,
  lang: PropTypes.string.isRequired,
  onNewPin: PropTypes.func.isRequired,
  onPinDelete: PropTypes.func.isRequired,
  mapCollections: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default MapContainer;

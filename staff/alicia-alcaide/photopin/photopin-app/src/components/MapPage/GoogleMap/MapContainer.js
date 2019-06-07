import React from "react";
import PropTypes from "prop-types";
import GoogleMapReact from "google-map-react";
import SearchBox from "./SearchBox";
import Marker from "../Marker";
import NewMarker from "../NewMarker";
import { placeType, coordinateType } from "../../../types";

class MapContainer extends React.Component {
  state = {
    mapApiLoaded: false,
    mapInstance: null,
    mapApi: null,
    places: [],
    newPlace: null
  };

  componentWillReceiveProps(props) {
    const { places } = props;
    this.setState({ places });
  }

  apiHasLoaded = (map, maps) => {
    this.setState({
      mapApiLoaded: true,
      mapInstance: map,
      mapApi: maps
    });
    map.setOptions({ draggableCursor: "crosshair" });
  };

  handleSearchResult = gmapPlace => {
    const place = {
      id: "",
      title: gmapPlace.name,
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
      this.state.mapInstance.setZoom(this.props.zoomOnSearchResult);
    }
  };

  handleNewPinCancelled = () => {
    this.setState({ newPlace: null });
  };

  onChildClickCallback = key => {
    this.props.onMarkerClick && this.props.onMarkerClick(key);
  };

  onClickCallback = e => {
    const place = {
      id: "",
      title: "",
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

  static defaultProps = {
    center: {
      lat: 63.53331,
      lng: -19.51168
    },
    zoom: 10
  };

  render() {
    const { places, newPlace, mapApiLoaded, mapInstance, mapApi } = this.state;
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "100vh", width: "100%" }}>
        {mapApiLoaded && (
          <SearchBox
            map={mapInstance}
            mapApi={mapApi}
            onSearchResult={this.handleSearchResult}
          />
        )}
        <GoogleMapReact
          bootstrapURLKeys={{
            key: process.env.REACT_APP_GOOGLE_MAPS_ID,
            libraries: ["places", "geometry"]
          }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.defaultZoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps)}
          onChildClick={this.onChildClickCallback}
          onClick={this.onClickCallback}
        >
          {places &&
            places.length > 0 &&
            places.map(place => (
              <Marker
                key={place.id}
                place={place}
                text={place.name}
                lat={place.geometry.location.lat}
                lng={place.geometry.location.lng}
              />
            ))}
          {newPlace && (
            <NewMarker
              place={newPlace}
              lat={newPlace.geometry.location.lat}
              lng={newPlace.geometry.location.lng}
              onNewPin={this.props.onNewPin}
              onCancel={this.handleNewPinCancelled}
              mapCollections={this.props.mapCollections}
              lang={this.props.lang}
            />
          )}
        </GoogleMapReact>
      </div>
    );
  }
}

MapContainer.propTypes = {
  places: PropTypes.arrayOf(placeType),
  center: coordinateType.isRequired,
  defaultZoom: PropTypes.number.isRequired,
  zoomOnSearchResult: PropTypes.number.isRequired,
  onMapClick: PropTypes.func,
  lang: PropTypes.string.isRequired,
  onNewPin: PropTypes.func.isRequired,
  mapCollections: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default MapContainer;

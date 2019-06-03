import React from "react";
import PropTypes from "prop-types";
import GoogleMapReact from "google-map-react";
import SearchBox from "./SearchBox";
import Marker from "./Marker";

class MapContainer extends React.Component {
  state = {
    mapApiLoaded: false,
    mapInstance: null,
    mapApi: null,
    places: []
  };


  componentWillReceiveProps(props){
    const { places } = props
    this.setState({places})
  }

  apiHasLoaded = (map, maps) => {
    this.setState({
      mapApiLoaded: true,
      mapInstance: map,
      mapApi: maps
    });
    map.setOptions({draggableCursor:'crosshair'});
  };

  addPlace = place => {
    this.setState({ places: place });
  };

  onChildClickCallback = key => {
    this.props.onMarkerClick && this.props.onMarkerClick(key) 
  };

  // onClickCallback = ({x, y, lat, lng, event}) => {
  onClickCallback = (e) => {
    //console.log(x, y, lat, lng, event)
    debugger
    this.props.onMapClick && this.props.onMapClick(e) 
  }

  static defaultProps = {
    center: {
      lat: 63.53331,
      lng: -19.51168
    },
    zoom: 10
  };
  
  render() {
    const { places, mapApiLoaded, mapInstance, mapApi } = this.state;
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "100vh", width: "100%" }}>
        {mapApiLoaded && (
          <SearchBox
            map={mapInstance}
            mapApi={mapApi}
            addplace={this.addPlace}
          />
        )}
        <GoogleMapReact
          bootstrapURLKeys={{
            key: process.env.REACT_APP_GOOGLE_MAPS_ID,
            libraries: ["places", "geometry"]
          }} // TODO: extract the key to a ENV prop
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps)}
          onChildClick={this.onChildClickCallback}
          onClick={this.onClickCallback}
        >
          { places &&
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
        </GoogleMapReact>
      </div>
    );
  }
}

MapContainer.propTypes = {
  center: PropTypes.object,
  zoom: PropTypes.number,
  onClick: PropTypes.func
};

export default MapContainer;

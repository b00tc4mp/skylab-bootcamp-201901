import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const { REACT_APP_MAPS_KEY } = process.env
debugger
const AnyReactComponent = ({ text }) => <div>{text}</div>;

class GoogleMaps extends Component {
  static defaultProps = {
    center: {
      lat: 41.40,
      lng: 2.19
    },
    zoom: 11
  };

  render() {
    console.log(process)
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100vw' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_KEY }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          yesIWantToUseGoogleMapApiInternals
        >
          <AnyReactComponent
            lat={41.4000032}
            lng={2.198312}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default GoogleMaps;
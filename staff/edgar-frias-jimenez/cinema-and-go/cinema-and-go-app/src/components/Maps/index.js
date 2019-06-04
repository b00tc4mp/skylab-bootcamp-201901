import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const { REACT_APP_MAPS_KEY } = process.env

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

class GoogleMaps extends Component {
  static defaultProps = {
    center: {
      lat: 41.40,
      lng: 2.19
    },
    zoom: 11
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100vw' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: REACT_APP_MAPS_KEY }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          yesIWantToUseGoogleMapApiInternals
        />
      </div>
    );
  }
}

export default GoogleMaps;
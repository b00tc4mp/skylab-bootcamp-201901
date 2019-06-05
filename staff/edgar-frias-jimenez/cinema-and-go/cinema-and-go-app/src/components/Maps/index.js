import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const { REACT_APP_MAPS_KEY } = process.env

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

const locate = () => {
    if (navigator.geolocation) {
        try {
            navigator.geolocation.getCurrentPosition(position => {
                const location = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }

                console.log(location)

                return location
            })
        } catch (error) {
            console.error(`Error: The Geolocation service failed. ${error}`)
        }
    } else {
        console.error('Error: Your browser doesn\'t support geolocation.')
    }
}

locate()

class GoogleMaps extends Component {
  static defaultProps = {
    center: {
      lat: 41.3981964,
      lng: 2.2000285,
    },
    zoom: 18.9
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
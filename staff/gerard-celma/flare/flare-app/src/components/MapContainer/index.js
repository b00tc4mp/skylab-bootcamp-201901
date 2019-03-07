import React, { Component } from 'react'
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react'

class MapContainer extends Component {
    state = {
        markers: [
          {
            name: "Current position",
            position: {
              lat: 37.77,
              lng: -122.42
            }
          }
        ]
      };
    
      onMarkerDragEnd = (coord, index) => {
        const { latLng } = coord;
        const lat = latLng.lat();
        const lng = latLng.lng();

        this.props.retrievePosition(lat,lng)
    
        this.setState(prevState => {
          const markers = [...this.state.markers];
          markers[index] = { ...markers[index], position: { lat, lng } };
          return { markers };
        });
      };
    
      render() {
        return (
          <Map
            google={this.props.google}
            style={{
              width: "300px",
              height: "300px"
            }}
            zoom={14}
          >
            {this.state.markers.map((marker, index) => (
              <Marker
                position={marker.position}
                draggable={true}
                onDragend={(t, map, coord) => this.onMarkerDragEnd(coord, index)}
                name={marker.name}
              />
            ))}
          </Map>
        );
      }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyAaqKkPfqRQS0OKc8Q2Y8pNnvhXbUyj3wI')
  })(MapContainer)
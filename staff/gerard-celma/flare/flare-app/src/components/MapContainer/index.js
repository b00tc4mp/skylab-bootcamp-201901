import React, { Component, Fragment } from 'react'
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react'

class MapContainer extends Component {
    state = {
        markers: [
          {
            name: "Current position",
            position: {
              lat: null,
              lng: null
            }
          }
        ]
      };

      componentDidMount() {
        const { state: { markers } } = this


        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => this.setState({ markers: [{ position: { lat: position.coords.latitude, lng: position.coords.longitude }}] }), (err) => console.warn('ERROR(' + err.code + '): ' + err.message),
          {
              timeout: 5000,
              enableHighAccuracy: true, 
              maximumAge: Infinity
          })
        }
      }

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
        const { state: { markers } } = this
        console.log(markers[0].position.lat, markers[0].position.lng)
        let showMap = markers[0].position.lat && markers[0].position.lng
        return (<Fragment>

          {!showMap && <div><i className="fas fa-spinner fa-pulse"></i><p>Loading Map</p></div>}

          { showMap &&
          <Map
            google={this.props.google}
            style={{
              width: "300px",
              height: "300px"
            }}
            initialCenter = {{
              lat: markers[0].position.lat,
              lng: markers[0].position.lng
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
      }
        </Fragment>);
      }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyAaqKkPfqRQS0OKc8Q2Y8pNnvhXbUyj3wI')
  })(MapContainer)
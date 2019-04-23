import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import React, { Component } from 'react'
import './index.sass';



const { REACT_APP_GOOGLE_MAPS_API_KEY } = process.env

export class MapContainer extends Component {
    render() {
        return (
            <div className = 'googleMap'>
                <Map google={this.props.google} zoom={14} initialCenter={{ lat: this.props.lat, lng: this.props.lng }}>

                    <Marker onClick={this.onMarkerClick}
                        position={{ lat: this.props.lat, lng: this.props.lng }} />
                </Map>


            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: (REACT_APP_GOOGLE_MAPS_API_KEY)
})(MapContainer)

import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api'

import { defaultMapZoom } from './config'
const { REACT_APP_MAPS_KEY } = process.env

function GoogleMaps({  customZoom, children }) {

    const defaultPos = localStorage.getItem('userLocation')
        ? localStorage.getItem('userLocation').split(',').map(item => parseFloat(item))
        : [41.3984046, 2.1998436]

    // const defaultPos = [41.3984046, 2.1998436]

    const userPosition = {
        lat: defaultPos[0],
        lng: defaultPos[1]
    }
    const zoom = defaultMapZoom

    return (
        <LoadScript
            id="script-loader"
            googleMapsApiKey={REACT_APP_MAPS_KEY}
        >
            <GoogleMap
                id='example-map'
                center={userPosition}
                mapContainerClassName='map-container'
                mapContainerStyle={{ height: '100vh', width: '100vw' }}
                zoom={customZoom ? customZoom : zoom}
            >
                {children}
            </GoogleMap>
        </LoadScript>
    )
}

export default GoogleMaps

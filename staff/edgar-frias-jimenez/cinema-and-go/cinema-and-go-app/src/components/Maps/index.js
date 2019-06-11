import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api'

import { defaultMapZoom, defaultMapProps, nightMapProps } from './config'
const { REACT_APP_MAPS_KEY } = process.env

function GoogleMaps({  customZoom, children }) {
    const now = new Date().getHours()

    const defaultPos = sessionStorage.getItem('userLocation') === null
        ? [41.3984046, 2.1998436]
        : sessionStorage.getItem('userLocation').split(',').map(item => parseFloat(item))

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
                center={userPosition}
                mapContainerClassName='map-container'
                mapContainerStyle={{ height: '100vh', width: '100vw' }}
                zoom={customZoom ? customZoom : zoom}
                options={now <= 18 ? defaultMapProps :  nightMapProps}
            >
                {children}
            </GoogleMap>
        </LoadScript>
    )
}

export default GoogleMaps

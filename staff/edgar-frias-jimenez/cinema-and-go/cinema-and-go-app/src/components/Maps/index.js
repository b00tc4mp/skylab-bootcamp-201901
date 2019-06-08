import React from 'react'
import GoogleMapReact from 'google-map-react'

import { defaultMapProps, defaultMapZoom } from './config'
const { REACT_APP_MAPS_KEY } = process.env

function GoogleMaps({ defaultPos, markers }) {
    const mapOptions = defaultMapProps
    const zoom = defaultMapZoom

    return (
        <section style={{ height: '100vh', width: '100vw' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: REACT_APP_MAPS_KEY }}
                defaultCenter={defaultPos}
                defaultZoom={zoom}
                yesIWantToUseGoogleMapApiInternals
                options={mapOptions}
            >
                {markers}
            </GoogleMapReact>
        </section>
    )
}

export default GoogleMaps

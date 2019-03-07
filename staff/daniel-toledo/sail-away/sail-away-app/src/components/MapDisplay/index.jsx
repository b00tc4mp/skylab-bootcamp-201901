'use strict'

import React from 'react'
import { Map, InfoWindow, GoogleApiWrapper, Polyline } from 'google-maps-react'


function MapDisplay({ google, routes, sea }) {

    return (<Map
        google={google}
        containerStyle={{ height: "50%" }}
        style={{
            width: "100%",
            height: "100%"
        }}
        initialCenter={{
            lat: sea.center.lat,
            lng: sea.center.lng
        }}
        zoom={sea.zoom}
    >
        {
            routes.map(route => {
                return <Polyline
                    path={route}
                    options={{
                        strokeColor: '#0000ff',
                        strokeOpacity: 1,
                        strokeWeight: 2,
                        icons: [{
                            icon: "hello",
                            offset: '0',
                            repeat: '10px'
                        }],
                    }} />

            })
        }
    </Map>)
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyAFDTq_HRLGd3dWHf2NLtw8Jv-05efTy7s')
})(MapDisplay)
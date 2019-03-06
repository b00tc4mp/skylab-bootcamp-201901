'use strict'

import React, { useState, useEffect } from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper, Polyline } from 'google-maps-react'


function MapRoute({ google, getRoute }) {

    let [markers, setMarkers] = useState([])

    function generateRoute(markers) {
        let route = []
        markers.forEach(({ position }) => route.push(position))
        getRoute(route)
        return route
    }

    function onMarkerDragEnd(coord, index) {
        const { latLng } = coord
        const lat = latLng.lat()
        const lng = latLng.lng()

        let newPosition = { lat, lng }

        markers[index].position = newPosition
        markers = [...markers]

        setMarkers(markers)
    }

    function mapClicked(mapProps, map, clickEvent) {
        const { latLng } = clickEvent
        const lat = latLng.lat()
        const lng = latLng.lng()

        let newMarker = {
            name: 'new marker',
            position: {
                lat,
                lng
            }
        }

        markers = [...markers, newMarker]
        setMarkers(markers)
    }

    function onMarkerClick(index) {
        markers.splice(index, 1)
        markers = [...markers]

        setMarkers(markers)

    }

    return (<Map
            containerStyle={{height: "50%"}}
            google={google}
            style={{
                width: "100%",
                height: "100%"
            }}
            zoom={7}
            onClick={(mapProps, map, clickEvent) => mapClicked(mapProps, map, clickEvent)}
        >
            {
                markers.map((marker, index) => {
                    if (index === 0) {
                        return <Marker
                            position={marker.position}
                            draggable={true}
                            animation={google.maps.Animation.DROP}
                            onDragend={(t, map, coord) => onMarkerDragEnd(coord, index)}
                            onClick={() => onMarkerClick(index)}
                            name={marker.name}
                        >
                        </Marker>
                    }
                    else {

                        return (<Marker
                            position={marker.position}
                            draggable={true}
                            onDragend={(t, map, coord) => onMarkerDragEnd(coord, index)}
                            onClick={() => onMarkerClick(index)}
                            name={marker.name}
                            icon={{
                                path: google.maps.SymbolPath.CIRCLE,
                                fillColor: '#00F',
                                fillOpacity: 0.6,
                                strokeColor: '#00A',
                                strokeOpacity: 0.9,
                                strokeWeight: 1,
                                scale: 3
                            }} />)


                    }
                })
            }


            <Polyline
                path={generateRoute(markers)}
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
        </Map>)
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyAFDTq_HRLGd3dWHf2NLtw8Jv-05efTy7s')
})(MapRoute)
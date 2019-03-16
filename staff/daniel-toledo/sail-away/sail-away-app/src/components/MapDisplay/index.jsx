'use strict'

import React, { useState, useEffect } from 'react'
import { Map, InfoWindow, GoogleApiWrapper, Polyline, Marker } from 'google-maps-react'

import logic from '../../logic'

function MapDisplay({ google, markers, seaId }) {

    let [routes, setRoutes]=useState(getRoutes(markers))
    let [sea, setSea]=useState(getSea(seaId))

    function getRoutes(markers) {
        routes=[]
        markers.forEach(marker => {
            let route=[]
            marker.forEach(mark=>route.push(mark.position))
            routes.push(route)
        })

        return routes
    }
    
    function getSea(id){
        try{
            return logic.retrieveSea(id)
        }catch(error){
            console.error(error)
        }
    }

    useEffect(()=>{
        setRoutes(getRoutes(markers))
        setSea(getSea(seaId))
     
    },[])

    return (<Map
        
        google={google}
        containerStyle={{  position: 'relative', height: "500px"}}
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
                    key={route}
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
import React from "react";
import { withRouter } from 'react-router-dom'
import './index.sass'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

function Maps({ handleAddUbication }) {

    const MyMapComponent = withScriptjs(withGoogleMap((props) =>
        <GoogleMap
            defaultZoom={13}
            defaultCenter={{ lat: 41.3910524, lng: 2.1806449 }}
        >
            <Marker position={{ lat: 41.40343, lng: 2.20279 }} onClick={() => handleAddUbication('Poblenou')} />
            <Marker position={{ lat: 41.40548, lng: 2.19148 }} onClick={() => handleAddUbication('Glories')} />
            <Marker position={{ lat: 41.4015, lng: 2.17295 }} onClick={() => handleAddUbication('Mallorca')} />
            <Marker position={{ lat: 41.39000 , lng: 2.160115 }} onClick={() => handleAddUbication('Valencia')} />
            <Marker position={{ lat: 41.38231, lng: 2.17676 }} onClick={() => handleAddUbication('Gotic')} />
            <Marker position={{ lat: 41.39387, lng: 2.1763 }} onClick={() => handleAddUbication('Tetuan')} />

        </GoogleMap>
    ))
    
    return (
        <section className='g-Order__map' >
            <MyMapComponent
                isMarkerShown
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDlUDOZVWrQl1z9VUe4tG8GSjtaIXmnTWY"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `calc(100vh - 125px)` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        </section>
        
    )
    
}
export default withRouter(Maps)

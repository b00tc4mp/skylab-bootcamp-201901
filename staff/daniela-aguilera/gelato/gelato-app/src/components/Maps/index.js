import React, { useState } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps'
import { Redirect } from 'react-router-dom'

function Maps () {
  // const [placeUbication, setPlaceUbication] = useState(false)
  const [showBasket, setShowBasket] = useState(false)

  const handlePlaceUbication = (ubic) => {
    setShowBasket(ubic)
    // setPlaceUbication(ubic)
    // <Redirect to='/my-basket' />
  }

  if (showBasket) {
    return (
      <Redirect to='/my-basket' />
    )
  }

  const MyMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
      defaultZoom={14}
      defaultCenter={{ lat: 41.40177588441426, lng: 2.200207937834165 }}
    >
      <Marker position={{ lat: 41.3984927, lng: 2.1999655 }}
        icon={'/favicon-32x32.png'}
        onClick={() => handlePlaceUbication('Carrer Poblenou 32')} >
        <InfoWindow>
          <p><span>Gelato Shop!</span> Carrer Poblenou 32</p>
        </InfoWindow>
      </Marker>
      <Marker position={{ lat: 41.39997864912067, lng: 2.1826035617963555 }}
        icon={'/favicon-32x32.png'}
        onClick={() => handlePlaceUbication('Carrer Tibidabo 58')}>
        <InfoWindow>
          <p><span>Gelato Shop!</span> Carrer Tibidabo 58</p>
        </InfoWindow>
      </Marker>
    </GoogleMap>
  ))

  return (
    <section className='g-Order__map' >
      <MyMapComponent
        isMarkerShown
        googleMapURL='https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDX0SuJgk5jtNqSBeqYa-2L5dQdnZKecpA'
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `350px`, width: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
      {/* {placeUbication &&
      <p><span>Gelato Shop!</span> {placeUbication}</p>
      } */}
    </section>
  )
}

export default Maps

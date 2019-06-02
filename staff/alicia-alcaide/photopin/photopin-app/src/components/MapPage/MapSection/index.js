import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import logic from "../../../logic";
import MapContainer from "../GoogleMap/MapContainer";
//import './index.sass'

const DEFAULT_MAP_ZOOM = 6

class MapSection extends Component {
    
    state = {places : [], mapCenter: null, zoom: DEFAULT_MAP_ZOOM }
  
    componentWillReceiveProps(props) {
        const {pmap} = props
        let places = []
        let mapCenter = null
        pmap && pmap.collections && pmap.collections.map(collection => {
            collection.pins && collection.pins.map(pin => {
                places.push(
                    {
                    id: pin._id,
                    title: pin.title,
                    collection: collection.title,
                    geometry: {
                        location: {
                        lat : pin.coordinates.latitude, 
                        lng: pin.coordinates.longitude
                        } 
                    },
                    showInfo: false      
                    }
                )
                if (!mapCenter) {
                    mapCenter = {
                        lat: pin.coordinates.latitude,
                        lng: pin.coordinates.longitude
                    }
                    //mapCenter = [pin.coordinates.latitude, pin.coordinates.longitude]
                }
            })
        })
        this.setState({places, mapCenter})
    }

    handleMarkerClick = (id) => {
        this.setState(state => {
            state.places.map(place => {
                place.id === id ? place.showInfo = !place.showInfo : place.showInfo = false
            })
            return { places: state.places }
          })
    }

    handleMapClick = (e) => {
        debugger
        this.setState(state => {
            state.places.map(place => {
                place.showInfo = false
            })
            return { places: state.places }
          })
    }

    render() {
        const {
        state: { places, mapCenter, zoom },
        handleMarkerClick,
        handleMapClick
        } = this;

        return (
            <section className="mapPage__Map">
            <MapContainer places={places}  zoom={zoom} onMarkerClick={handleMarkerClick} onMapClick={handleMapClick}/> 
            {/* TODO: Si se pasa mapCenter por props no pinta el mapa, si se deja 
                por defecto sique funciona 
               center={mapCenter}  */}
            </section>
        )
    }
}

export default withRouter(MapSection);


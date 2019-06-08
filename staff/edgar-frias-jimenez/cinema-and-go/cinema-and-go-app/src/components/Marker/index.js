import React from "react"
import { Marker } from '@react-google-maps/api'

const CustomMarker = ({ customPosition })  => {
    const pointPosition = {
        lat: customPosition[0],
        lng: customPosition[1]
    }

    return (
        <Marker
            onClick={marker => {
                console.log('click', marker)
            }}
            position={pointPosition}
        />
    )
}

export default CustomMarker

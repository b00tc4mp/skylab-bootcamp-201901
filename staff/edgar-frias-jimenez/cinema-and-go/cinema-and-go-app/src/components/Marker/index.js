import React from "react"
import { Marker } from '@react-google-maps/api'

const CustomMarker = ({ customPosition, customHandler, visible, icon })  => {
    const pointPosition = {
        lat: customPosition[0],
        lng: customPosition[1]
    }

    return (
        <Marker
            position={pointPosition}
            onClick={customHandler}
            visible={visible}
            icon={icon}
        />
    )
}

export default CustomMarker

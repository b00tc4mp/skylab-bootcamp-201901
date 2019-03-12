import React from 'react'
import './index.sass'
import Calendar from '../Calendar'
import TimeSelector from '../TimeSelector'

export default function MapFilter ({ setPreferedDate, setPreferedTime }) {
    return (
        <div>
            <TimeSelector setEventTime={setPreferedTime}/>
            <Calendar setEventDate={setPreferedDate}/>
        </div>
    )
}
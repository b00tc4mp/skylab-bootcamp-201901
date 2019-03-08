import React, { Fragment } from 'react'
import './index.sass'

export default function CreateEvent ({ setEventTime, setEventDate, setReservationName }) {
    return (
        <Fragment>
            <p>select a date for the event</p>
            <input type='date' onChange={e => {e.preventDefault(); setEventDate(e)}}/>
            <input/>
            <p>hour selector</p>
            <p>reservation name</p>
            <input type='text' placeholder='reservation name' onChange={e => {e.preventDefault(); setReservationName(e.target.value)}}/>
            <p>restaurant type</p>
        </Fragment>
    )
}
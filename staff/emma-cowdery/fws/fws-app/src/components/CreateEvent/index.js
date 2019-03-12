import React, { Fragment } from 'react'
import './index.sass'
import Calendar from '../Calendar'
import TimeSelector from '../TimeSelector'
import CategorySelector from '../CategorySelector'

export default function CreateEvent ({ setEventTime, setEventDate, setReservationName , setRestaurantCategory}) {
    return (
        <Fragment>
            <p>select a date for the event</p>
            <Calendar setEventDate={setEventDate}/>
            <p setEventTime={setEventTime}>hour selector</p>
            <TimeSelector setEventTime={setEventTime}/>
            <p>reservation name</p>
            <input type='text' placeholder='reservation name' onChange={e => {e.preventDefault(); setReservationName(e.target.value)}}/>
            <p>restaurant type</p>
            <CategorySelector setRestaurantCategory={setRestaurantCategory}/>
        </Fragment>
    )
}
import React, { Fragment, useState, useEffect } from 'react'
import './index.sass'
import logic from '../../logic'
import Calendar from '../Calendar'
import TimeSelector from '../TimeSelector'
import CategorySelector from '../CategorySelector'

export default function CreateEvent ({ setCreateEvent, lat, lng, rating, priceLevel, restaurantName, selectedRestaurant, setLat, setLng, setRating, setPriceLevel, setRestaurantName }) {
    const [eventTime, setEventTime] = useState()
    const [eventDate, setEventDate] = useState()
    const [reservationName, setReservationName] = useState(undefined)
    const [restaurantCategory, setRestaurantCategory] = useState('American')
    const [chatName, setChatName] = useState()

    function handleEventCreation () {
        const eventLocation = []
        eventLocation.push(lat, lng)

        if (priceLevel === undefined) priceLevel = 2

        logic.createEvent(selectedRestaurant, eventTime, eventDate, reservationName, restaurantCategory, eventLocation, priceLevel, rating, restaurantName)
            .then(eventId => {
                logic.createChat(chatName, eventId)
                    .then(chatId => {
                        if (!chatId) console.log('error')//feedback to error
                        else console.log('egood') //feedback to good
                    })
            })
            .then(() => {
                setCreateEvent(false)
                setEventDate()
                setEventDate()
                setReservationName()
                setRestaurantCategory()
                setLat()
                setLng()
                setRating()
                setPriceLevel()
                setRestaurantName()
                setChatName()
                //set feedback message to event created successfully
            })
            .catch(err => {
                console.log(err)
                //delete console log and set feedback to err
            })
    }
    return (
        <Fragment>
            <div className='create-event'>
                <div className='create-event__content'>
                    <h2>create an event</h2>
                    <p className='create-event__title'>select a date</p>
                    <div className='create-event__calendar'>
                        <Calendar setEventDate={setEventDate}/>
                    </div>
                    <div className='create-event__div'>
                        <div className='create-event__lildiv'>
                            <p className='create-event__title'>select a time</p>
                            <TimeSelector setEventTime={setEventTime}/>
                        </div>
                        <div className='create-event__lildiv'>
                            <p className='create-event__title'>reservation name</p>
                            <input className='create-event__name' type='text' placeholder='reservation name' onChange={e => {e.preventDefault(); setReservationName(e.target.value)}}/>
                        </div>
                        <div className='create-event__lildiv'>
                            <p className='create-event__title'>restaurant type</p>
                            <CategorySelector setRestaurantCategory={setRestaurantCategory}/>
                        </div>
                    </div>
                    <p>want to chat with the strangers?</p>
                    <p>to create a chat please enter a chat name</p>
                    <input className='create-event__chat-name' type='text' placeholder='chat name' onChange={e => {e.preventDefault(); setChatName(e.target.value)}}/>
                    <div className='create-event__buttons'>
                        <button className='create-event__buttons-cancel' onClick={e => {e.preventDefault(); setCreateEvent(false)}}>cancel</button>
                        <button className='create-event__buttons-create' onClick={e => {e.preventDefault(); handleEventCreation(); setCreateEvent(false)}}>create event</button>
                    </div>
                </div>
                
            </div>
        </Fragment>
    )
}
import React, { Fragment, useState } from 'react'
import './index.sass'
import logic from '../../logic'
import Calendar from '../Calendar'
import TimeSelector from '../TimeSelector'
import CategorySelector from '../CategorySelector'

export default function CreateEvent ({ setCreateEvent, lat, lng, rating, priceLevel, restaurantName, selectedRestaurant, setLat, setLng, setRating, setPriceLevel, setRestaurantName, setFeedback, setLevel, setType }) {
    const [eventTime, setEventTime] = useState()
    const [eventDate, setEventDate] = useState()
    const [reservationName, setReservationName] = useState(undefined)
    const [restaurantCategory, setRestaurantCategory] = useState('American')
    const [chatName, setChatName] = useState()

    function handleEventCreation () {
        const eventLocation = []
        eventLocation.push(lat, lng)

        if (priceLevel === undefined) priceLevel = 2

        try {
            logic.createEvent(selectedRestaurant, eventTime, eventDate, reservationName, restaurantCategory, eventLocation, priceLevel, rating, restaurantName)
            .then(eventId => {
                logic.createChat(chatName, eventId)
                    .then(chatId => {
                        if (!chatId) {
                            setFeedback('error on creating event')
                            setLevel('alert')
                            setType('banner')
                            setCreateEvent(false)
                        } else {
                            setFeedback('event created successfully')
                            setLevel('success')
                            setType('banner')
                            setCreateEvent(false)
                        }
                    })
                    .catch(err => {
                        setFeedback(err.message)
                        setLevel('warning')
                        setType('banner')
                        setCreateEvent(false)
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
                setFeedback('event created successfuly')
                setLevel('siccess')
                setType('banner')
            })
            .catch(err => {
                setFeedback(err.message)
                setLevel('warning')
                setType('banner')
                setCreateEvent(false)
            })
        } catch ({message}) {
            setFeedback(message)
            setLevel('warning')
            setType('banner')
            setCreateEvent(false)
        }
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
                        <div className='create-event__minidiv'>
                            <div className='create-event__lildiv'>
                                <p className='create-event__title'>select a time</p>
                                <TimeSelector setEventTime={setEventTime}/>
                            </div>
                            <div className='create-event__lildiv'>
                                <p className='create-event__title'>reservation name</p>
                                <input className='create-event__name' type='text' placeholder='reservation name' onChange={e => {e.preventDefault(); setReservationName(e.target.value)}}/>
                            </div>
                        </div>
                        
                        <div className='create-event__lildiv'>
                            <p className='create-event__title'>restaurant type</p>
                            <CategorySelector setRestaurantCategory={setRestaurantCategory}/>
                        </div>
                    </div>
                    <p className='create-event__exp'>want to chat with the strangers?</p>
                    <p className='create-event__exp'>to create a chat please enter a chat name</p>
                    <input className='create-event__chat-name' type='text' placeholder='chat name' onChange={e => {e.preventDefault(); setChatName(e.target.value)}}/>
                    <div className='create-event__buttons'>
                        <button className='create-event__buttons-cancel' onClick={e => {e.preventDefault(); setCreateEvent(false)}}>cancel</button>
                        <button className='create-event__buttons-create' onClick={e => {e.preventDefault(); handleEventCreation()}}>create event</button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
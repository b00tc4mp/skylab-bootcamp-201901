import React,  { Fragment, useState, useEffect } from 'react'
import Navbar from '../NavBar'
import logic from '../../logic'
import './index.sass'
import MoreRestaurantInfo from '../MoreRestaurantInfo'
import BouncingLoader from '../BouncingLoader'
import HowTo from '../HowTo'
import CreateEvent from '../CreateEvent'

export default function RestaurantResults() {
    const [results, setResults] = useState()
    const [query, setQuery] = useState('near me')
    const [info, setInfo] = useState(false)
    const [selectedRestaurant, setSelectedRestaurant] = useState()
    const [showHowTo, setShowHowTo] = useState(false)
    const [createEvent, setCreateEvent] = useState(false)
    const [eventTime, setEventTime] = useState()
    const [eventDate, setEventDate] = useState()
    const [reservationName, setReservationName] = useState()

    useEffect(() => {
        logic.howTo()
            .then(res => setShowHowTo(res.howTo) )
            //set fesback message
    }, [])

    useEffect(() => {
        logic.searchRetaurants(query)
            .then(({results}) => {

                let a = results.map(result => {
                    return logic.retrievePhoto(result.photos[0].photo_reference)
                            .then(imgUrl => result.img = imgUrl)
                            //needs a catch to set feedback message
                })

                return Promise.all(a).then(b => b).then(()=> setResults(results))
            }) 
            .catch(err => {
                console.log(err)
                //delete console log and set feedback to err
            })     
    }, [query])

    function handleEventCreation () {
        logic.createEvent(selectedRestaurant, eventTime, eventDate, reservationName)
            .then(() => {
                setCreateEvent(false)
                //set feedback message to event created successfully
            })
            .catch(err => {
                console.log(err)
                //delete console log and set feedback to err
            })
    }

    console.log(eventDate)

    return (
        <Fragment>
            <Navbar setQuery={setQuery}/>
            <main>
                <p>Results</p>
                {results ? results.map(({ img, formatted_address, name, opening_hours: { open_now }, place_id, price_level, rating }) => {
                    return <div key={place_id}>
                        <p>{name}</p>
                        <p>{formatted_address}</p>
                        <p>{open_now ? 'yes' : 'no'}</p>
                        <img src={img} alt='alt'/>
                        <p>{place_id}</p>
                        <p>{price_level}</p>
                        <p>{rating}</p>
                        <button onClick={e => {e.preventDefault(); setSelectedRestaurant(place_id); setInfo(true)}}>+ info</button>
                    </div>
                }) : <BouncingLoader/>}
                {info && <div className='more-restaurant-info'>
                    <MoreRestaurantInfo place_id={selectedRestaurant} setInfo={setInfo}/>
                    <button onClick={e => {e.preventDefault(); setInfo(false); setCreateEvent(true)}}>create event</button>
                </div>}
                {createEvent && <div className='create-event'>
                    <button onClick={e => {e.preventDefault(); setCreateEvent(false)}}>x</button>
                    <CreateEvent setEventTime={setEventTime} setEventDate={setEventDate} setReservationName={setReservationName}/>
                    <button onClick={handleEventCreation}>create event</button>
                </div>}
                {showHowTo && <div className='how-to'><HowTo setShowHowTo={setShowHowTo}/></div>}
            </main>
        </Fragment>
    )
}
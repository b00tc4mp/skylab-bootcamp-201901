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
    const [reservationName, setReservationName] = useState(undefined)
    const [restaurantCategory, setRestaurantCategory] = useState('American')
    const [lat, setLat] = useState()
    const [lng, setLng] = useState()
    const [priceLevel, setPriceLevel] = useState()
    const [rating, setRating] = useState()
    const [restaurantName, setRestaurantName] = useState()

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
        const eventLocation = []
        eventLocation.push(lat, lng)

        logic.createEvent(selectedRestaurant, eventTime, eventDate, reservationName, restaurantCategory, eventLocation, priceLevel, rating, restaurantName)
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
                //set feedback message to event created successfully
            })
            .catch(err => {
                console.log(err)
                //delete console log and set feedback to err
            })
    }

    function handleNoPriceLevel (price_level) {
        if (!price_level) setPriceLevel(2)
        else setPriceLevel(price_level)
    }

    console.log(results)
    console.log(priceLevel, rating)

    return (
        <Fragment>
            <Navbar setQuery={setQuery}/>
            <main>
                <p>Results</p>
                {results ? results.map(({ img, geometry, formatted_address, name, opening_hours, place_id, price_level, rating }) => {
                    return <div key={place_id}>
                        <p>{name}</p>
                        <p>{formatted_address}</p>
                        {opening_hours && <p>{opening_hours.open_now ? 'yes' : 'no'}</p>}
                        <img src={img} alt='alt'/>
                        <p>{place_id}</p>
                        <p>{price_level}</p>
                        <p>{rating}</p>
                        <button onClick={e => {e.preventDefault(); setSelectedRestaurant(place_id); setInfo(true); setLat(geometry.location.lat); setLng(geometry.location.lng); handleNoPriceLevel(price_level); setRating(rating); setRestaurantName(name)}}>+ info</button>
                    </div>
                }) : <BouncingLoader/>}
                {info && <div className='more-restaurant-info'>
                    <MoreRestaurantInfo place_id={selectedRestaurant} setInfo={setInfo}/>
                    <button onClick={e => {e.preventDefault(); setInfo(false); setCreateEvent(true)}}>create event</button>
                </div>}
                {createEvent && <div className='create-event'>
                    <button onClick={e => {e.preventDefault(); setCreateEvent(false)}}>x</button>
                    <CreateEvent setEventTime={setEventTime} setEventDate={setEventDate} setReservationName={setReservationName} setRestaurantCategory={setRestaurantCategory}/>
                    <button onClick={handleEventCreation}>create event</button>
                </div>}
                {showHowTo && <div className='how-to'><HowTo setShowHowTo={setShowHowTo}/></div>}
            </main>
        </Fragment>
    )
}
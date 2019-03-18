import React,  { Fragment, useState, useEffect } from 'react'
import Navbar from '../NavBar'
import logic from '../../logic'
import './index.sass'
import MoreRestaurantInfo from '../MoreRestaurantInfo'
import BouncingLoader from '../BouncingLoader'
import HowTo from '../HowTo'
import CreateEvent from '../CreateEvent'

export default function RestaurantResults({ setShowRightBar, setShowDropdown }) {
    const [results, setResults] = useState()
    const [query, setQuery] = useState('near me')
    const [selectedRestaurant, setSelectedRestaurant] = useState()
    const [showHowTo, setShowHowTo] = useState(false)
    const [createEvent, setCreateEvent] = useState(false)
    const [lat, setLat] = useState()
    const [lng, setLng] = useState()
    const [priceLevel, setPriceLevel] = useState()
    const [rating, setRating] = useState()
    const [restaurantName, setRestaurantName] = useState()

    useEffect(() => {
        logic.howTo()
            .then(res => setShowHowTo(res.howTo))
            //set fesback message
    }, [])

    useEffect(() => {
        setResults()
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

    return (
        <Fragment>
            <Navbar setQuery={setQuery} setShowDropdown={setShowDropdown} setShowRightBar={setShowRightBar}/>
            <div className='restaurant-results'>
                {results ? results.map(({ geometry, formatted_address, name, opening_hours, place_id, price_level, rating }) => {
                    return <div className='restaurant-results__restaurant'><MoreRestaurantInfo place_id={place_id} geometry={geometry} formatted_address={formatted_address} name={name} opening_hours={opening_hours} price_level={price_level} rating={rating} setSelectedRestaurant={setSelectedRestaurant} setLat={setLat} setLng={setLng} setPriceLevel={setPriceLevel} setRating={setRating} setRestaurantName={setRestaurantName} setCreateEvent={setCreateEvent}/></div>
                }) : <BouncingLoader/>}
                {showHowTo && <div className='restaurant-results__how-to'><HowTo setShowHowTo={setShowHowTo}/></div>}
            </div>
            {createEvent && <CreateEvent setCreateEvent={setCreateEvent} lat={lat} lng={lng} rating={rating} priceLevel={priceLevel} restaurantName={restaurantName} selectedRestaurant={selectedRestaurant} setLat={setLat} setLng={setLng} setRating={setRating} setPriceLevel={setPriceLevel} setRestaurantName={setRestaurantName}/>}
        </Fragment>
    )
}
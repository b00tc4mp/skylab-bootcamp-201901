import React,  { Fragment, useState, useEffect } from 'react'
import './index.sass'
import { withRouter, Route, Redirect } from 'react-router-dom'
import Navbar from '../NavBar'
import logic from '../../logic'
import MoreRestaurantInfo from '../MoreRestaurantInfo'
import BouncingLoader from '../BouncingLoader'
import HowTo from '../HowTo'
import CreateEvent from '../CreateEvent'
import Feedback from '../Feedback'

export default withRouter(function RestaurantResults(props) {
    const [results, setResults] = useState()
    const [q, setQuery] = useState('near me')
    const [selectedRestaurant, setSelectedRestaurant] = useState()
    const [showHowTo, setShowHowTo] = useState(false)
    const [createEvent, setCreateEvent] = useState(false)
    const [lat, setLat] = useState()
    const [lng, setLng] = useState()
    const [priceLevel, setPriceLevel] = useState()
    const [rating, setRating] = useState()
    const [restaurantName, setRestaurantName] = useState()
    const [submit, setSubmit] = useState()
    const [feedback, setFeedback] = useState()
    const [level, setLevel] = useState()
    const [type, setType] = useState() 
    const [bouncy, setBouncy] = useState(true)

    

    useEffect(() => {
        logic.howTo()
            .then(res => setShowHowTo(res.howTo))
            //set fesback message 
    }, [])

    useEffect(() => {
        setFeedback()
        setLevel()
        setType()
        setBouncy(true)
        setResults()

        props.history.push(`/restaurant-results/search/${q}`)

        try {
            logic.searchRetaurants(q)
            .then(({results}) => {
                let a = results.map(result => {
                    return logic.retrievePhoto(result.photos[0].photo_reference)
                            .then(imgUrl => result.img = imgUrl)
                            //needs a catch to set feedback message
                })

                return Promise.all(a).then(b => b).then(()=> setResults(results))
            }) 
            .catch(err => {
                if (err.message === 'unable to search at this moment') setFeedback('no results')
                else setFeedback(err.message)
                setLevel('warning')
                setType('banner')
                setBouncy(false)
            })
        } catch ({message}) {
            setFeedback(message)
            setLevel('warning')
            setType('banner')
        }
    }, [q])

    return (
        <Fragment>
            <Navbar setQuery={setQuery} setShowDropdown={props.setShowDropdown} setShowRightBar={props.setShowRightBar} setSubmit={setSubmit} q={q}/>
            <div className='restaurant-results'>
                {results ? results.map(({ geometry, formatted_address, name, opening_hours, place_id, price_level, rating }) => {
                    return <div key={place_id} className='restaurant-results__restaurant'><MoreRestaurantInfo place_id={place_id} geometry={geometry} formatted_address={formatted_address} name={name} opening_hours={opening_hours} price_level={price_level} rating={rating} setSelectedRestaurant={setSelectedRestaurant} setLat={setLat} setLng={setLng} setPriceLevel={setPriceLevel} setRating={setRating} setRestaurantName={setRestaurantName} setCreateEvent={setCreateEvent} setResFeedback={setFeedback}/></div>
                }) : bouncy && <BouncingLoader/>}
                {showHowTo && <HowTo setShowHowTo={setShowHowTo}/>}
            </div>
            {createEvent && <CreateEvent setFeedback={setFeedback} setLevel={setLevel} setType={setType} setCreateEvent={setCreateEvent} lat={lat} lng={lng} rating={rating} priceLevel={priceLevel} restaurantName={restaurantName} selectedRestaurant={selectedRestaurant} setLat={setLat} setLng={setLng} setRating={setRating} setPriceLevel={setPriceLevel} setRestaurantName={setRestaurantName}/>}
            {feedback && <Feedback feedback={feedback} level={level} type={type} setFeedback={setFeedback}/>}
        </Fragment>
    )
})
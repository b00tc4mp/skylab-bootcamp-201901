import React, { Fragment, useEffect, useState } from 'react'
import logic from '../../logic'
import './index.sass'
import BouncingLoader from '../BouncingLoader'
import Feedback from '../Feedback'

export default function MoreRestaurantInfo ({ setResFeedback, place_id, geometry, formatted_address, name, price_level, rating, setSelectedRestaurant, setLat, setLng, setPriceLevel, setRating, setRestaurantName, setCreateEvent }) {
    const [result, setResult] = useState()
    const [counter, setCounter] = useState(0)
    const [eventStyle, setEventStyle] = useState()
    const [feedback, setFeedback] = useState()
    const [level, setLevel] = useState()
    const [type, setType] = useState()

    if (counter === 10) setCounter(0)
    if (counter === -1) setCounter(9)

    useEffect(() => {
        try {
            logic.restaurantDetails(place_id)
            .then(({result}) => {
                setResult(result)
                
                logic.retrievePhoto(result.photos[0].photo_reference)
                    .then(url => setEventStyle({backgroundImage: `url(${url})`}))
            })
            .catch(err => {
                setFeedback(err.message)
                setLevel('warning')
                setType('banner')
            })
        } catch ({message}) {
            setFeedback(message)
            setLevel('warning')
            setType('banner')
        }
    }, []) 

    useEffect(() => {
        result && logic.retrievePhoto(result.photos[counter].photo_reference)
            .then(url => setEventStyle({backgroundImage: `url(${url})`}))
    }, [counter])

    return (
        <Fragment>
            {result ? 
                <div className='retraurant-info'>
                    <div style={ eventStyle } className='restaurant-info__background'>
                        <div className='restaurant-info__background-center'>
                            <i onClick={e => {e.preventDefault(); setCounter(counter - 1)}} className="fas fa-chevron-circle-left restaurant-info__background-arrow"></i>
                            <i onClick={e => {e.preventDefault(); setCounter(counter + 1)}} className="fas fa-chevron-circle-right restaurant-info__background-arrow"></i>
                        </div>
                        <div className='restaurant-info__background-info'>
                            <p className='restaurant-info__background-info-price'>{price_level ? '$ '.repeat(price_level) : '$ $'}</p>
                            <p className='restaurant-info__background-info-rating'>{rating ? rating : 3 }<i className="far fa-star restaurant-info__background-info-star"></i></p>
                        </div>
                    </div>
                    <div className='restaurant-info__info'>
                        <div className='restaurant-info__info-text'>
                            <div className='restaurant-info__info-div'>
                                <p className='restaurant-info__info-name'>{name}</p>
                                <a className='restaurant-info__info-phone' href={`tel:${result.international_phone_number}`}>{result.international_phone_number}</a>
                            </div>
                            <p className='restaurant-info__info-address'>{formatted_address}</p>
                        </div>
                        <div className='restaurant-info__info-when'>
                            {result.opening_hours ? result.opening_hours.weekday_text.map(day => <p key={day} className='restaurant-info__info-when-txt'>{day}</p>): <p className='restaurant-info__info-when-txt'>no opening hours available</p>}
                        </div>
                        <div className='restaurant-info__info-links'>
                            <a className='restaurant-info__info-link restaurant-info__info-link-one' href={result.url} target="_blank"><i className="fas fa-map-marked-alt restaurant-info__info-link-icon"/> open in maps</a>
                            <a className='restaurant-info__info-link restaurant-info__info-link-two' href={result.website} target="_blank"><i className="fas fa-desktop restaurant-info__info-link-icon"></i> website</a>
                        </div>
                    </div>
                    <div className='restaurant-info__create' onClick={e => {e.preventDefault(); setCreateEvent(true); setSelectedRestaurant(place_id); setLat(geometry.location.lat); setLng(geometry.location.lng); setPriceLevel(price_level); setRating(rating); setRestaurantName(name); setResFeedback()}}>
                        <button className='restaurant-info__create-button'>create event</button>
                    </div>
                </div>
            : <BouncingLoader/>}
            {feedback && <Feedback feedback={feedback} level={level} type={type} setFeedback={setFeedback}/>}
        </Fragment>
    )
}
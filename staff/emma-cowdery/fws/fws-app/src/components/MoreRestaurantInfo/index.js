import React, { Fragment, useEffect, useState } from 'react'
import logic from '../../logic'
import './index.sass'
import BouncingLoader from '../BouncingLoader'

export default function MoreRestaurantInfo ({ place_id, setInfo }) {
    const [result, setResult] = useState()
    const [counter, setCounter] = useState(0)
    const [photoUrl, setPhotoUrl] = useState()

    if (counter === 10) setCounter(0)
    if (counter === -1) setCounter(9)

    useEffect(() => {
        logic.restaurantDetails(place_id)
            .then(({result}) => {
                setResult(result)
                console.log(result)
                
                logic.retrievePhoto(result.photos[0].photo_reference)
                    .then(url => setPhotoUrl(url))
            })
    }, []) 

    useEffect(() => {
        result && logic.retrievePhoto(result.photos[counter].photo_reference)
                    .then(url => setPhotoUrl(url))
    }, [counter])

    return (
        <Fragment>
            <button onClick={e => {e.preventDefault(); setInfo(false)}}>x</button>
            {result ? 
                <div>
                    <p className='restaurantInfoPanel'>{result.international_phone_number}</p>
                    <p>{result.opening_hours.weekday_text}</p> 
                    <img src={photoUrl} alt='restaurant'/>
                    <button onClick={e => {e.preventDefault(); setCounter(counter - 1)}}>left</button>
                    <button onClick={e => {e.preventDefault(); setCounter(counter + 1)}}>right</button>
                </div>
            : <BouncingLoader/>}
        </Fragment>
    )
}
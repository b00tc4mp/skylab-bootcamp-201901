import React, { Fragment, useEffect, useState } from 'react'
import logic from '../../logic'
import './index.sass'
import BouncingLoader from '../BouncingLoader'

export default function MoreRestaurantInfo ({ place_id, setInfo }) {
    const [result, setResult] = useState()
    const [counter, setCounter] = useState(0)

    const photoUrls = []

    useEffect(() => {
        logic.restaurantDetails(place_id)
            .then(({result}) => {
                setResult(result)
                console.log(result)

                result.photos.map(photo => {
                    logic.retrievePhoto(photo.photo_reference)
                        .then(url => photoUrls.push(url))
                })
                photoUrls.map(url => console.log(url))
                console.log(photoUrls[0])
            })
    }, []) 

    console.log(counter)

    // function handleHideInfo() {
    //     setInfo(false)
    // }

    return (
        <Fragment>
            <button onClick={e => {e.preventDefault(); setInfo(false)}}>x</button>
            {result ? 
                <div>
                    <p className='restaurantInfoPanel'>{result.international_phone_number}</p>
                    <p>{result.opening_hours.weekday_text}</p> 
                    <img src={photoUrls[counter]} alt='restaurant photo'/>
                    <button onClick={e => {e.preventDefault(); setCounter(counter - 1)}}>left</button>
                    <button onClick={e => {e.preventDefault(); setCounter(counter + 1)}}>right</button>
                </div>
            : <BouncingLoader/>}
        </Fragment>
    )
}
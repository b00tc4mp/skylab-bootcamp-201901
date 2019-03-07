import React,  { Fragment, useState, useEffect } from 'react'
import Navbar from '../NavBar'
import logic from '../../logic'
import './index.sass'
import MoreRestaurantInfo from '../MoreRestaurantInfo'
import BouncingLoader from '../BouncingLoader'

export default function RestaurantResults() {
    const [results, setResults] = useState()
    const [query, setQuery] = useState('near me')
    const [photo, setPhoto] = useState()
    const [info, setInfo] = useState(false)
    const [selectedRestaurant, setSelectedRestaurant] = useState()

    useEffect(() => {
        logic.searchRetaurants(query)
            .then(({results}) => {

                let a = results.map(result => {
                    return logic.retrievePhoto(result.photos[0].photo_reference)
                            .then(imgUrl => result.img = imgUrl)
                })

                return Promise.all(a).then(b => b).then(()=> setResults(results))
            })      
    }, [query])

    return (
        <Fragment>
            <Navbar setQuery={setQuery}/>
            <main>
                <p>Results</p>
                {results ? results.map(({ img, formatted_address, name, opening_hours: { open_now }, photos, place_id, price_level, rating }) => {
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
                    <MoreRestaurantInfo place_id={selectedRestaurant} setInfo={setInfo}/>}
                </div>}
                
            </main>
        </Fragment>
    )
}
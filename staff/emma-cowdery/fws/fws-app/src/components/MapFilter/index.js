import React, { useState, useEffect } from 'react'
import './index.sass'
import Calendar from '../Calendar'
import TimeSelector from '../TimeSelector'
import CategorySelector from '../CategorySelector'

export default function MapFilter ({ setPreferedDate, setTimeRange, setFilteredCategory, setDistance, setRating, setPriceRange }) {
    const [time1, setTime1] = useState()
    const [time2, setTime2] = useState()
    const [min, setMin] = useState('0')
    const [max, setMax] = useState('5')

    const values = [0, 1, 2, 3, 4, 5]

    useEffect(() => {
        let timeRange = []

        if (time1 && time1.substring(0, 2) !== String(new Date()).substring(16, 18)) timeRange[0] = time1

        if (time2 && time2.substring(0, 2) !== String(new Date()).substring(16, 18)) timeRange[1] = time2

        if (timeRange.length) setTimeRange(timeRange)

    }, [time1, time2])

    useEffect(() => {
        setPriceRange([min, max])

    }, [min, max])

    function handleSetDistance (e) {
        if (!e) setDistance(60)
        else setDistance(Number(e))
    }


    return (
        <div>
            <div>
                <h3>select a time range</h3>
                <p>min time</p>
                <TimeSelector setEventTime={setTime1}/>
                <p>max time</p>
                <TimeSelector setEventTime={setTime2}/>
            </div>
            <div>
                <h3>select a price range</h3>
                <p>max price</p>
                <select onChange={e => {e.preventDefault(); setMin(e.target.value)}} defaultValue='0'>
                    {values.map(value => <option value={value}>{value}</option>)}
                </select>
                <p>min price</p>
                <select onChange={e => {e.preventDefault(); setMax(e.target.value)}} defaultValue='5'>
                    {values.map(value => <option value={value}>{value}</option>)}
                </select>
            </div>
            <div>
                <h3>select a max distance</h3>
                <input type='number' onChange={e => {e.preventDefault(); handleSetDistance(e.target.value)}}/>
                <p>km</p>
            </div>
            <div>
                <h3>select a min restaurant rating</h3>
                <select onChange={e => {e.preventDefault(); setRating(e.target.value)}} defaultValue='0'>
                    {values.map(value => <option value={value}>{value}</option>)}
                </select>
            </div>
            <div>
                <h3>select a prefered restaurant category</h3>
                <CategorySelector setRestaurantCategory={setFilteredCategory}/>
            </div>
            <Calendar setEventDate={setPreferedDate}/>
        </div>
    )
}
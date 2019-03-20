import React, { useState, useEffect } from 'react'
import './index.sass'
import Calendar from '../Calendar'
import TimeSelector from '../TimeSelector'
import CategorySelector from '../CategorySelector'

export default function MapFilter ({ setPreferedDate, setTimeRange, setFilteredCategory, setDistance, setRating, setPriceRange }) {
    const [time1, setTime1] = useState('00:00')
    const [time2, setTime2] = useState('23:00')
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
        <div className='map-filter'>
            <div className='map-filter__fil'>
                <p className='map-filter__fil-title'>select a time range</p>
                <div className='map-filter__fil-items'>
                    <div className='map-filter__fil-item'>
                        <p className='map-filter__fil-txt'>min</p>
                        <TimeSelector setEventTime={setTime1}/>
                    </div>
                    <div className='map-filter__fil-item'>
                        <p className='map-filter__fil-txt'>max</p>
                        <TimeSelector setEventTime={setTime2}/>
                    </div>
                </div>    
            </div>
            <div className='map-filter__fil'>
                <p className='map-filter__fil-title'>select a price range</p>
                <div className='map-filter__fil-items'>
                    <div className='map-filter__fil-item'>
                        <p className='map-filter__fil-txt'>min</p>
                        <select className='map-filter__fil-select' onChange={e => {e.preventDefault(); setMin(e.target.value)}} defaultValue='0'>
                            {values.map(value => <option value={value}>{value}</option>)}
                        </select>
                    </div>  
                    <div className='map-filter__fil-item'>
                        <p className='map-filter__fil-txt'>max</p>
                        <select className='map-filter__fil-select' onChange={e => {e.preventDefault(); setMax(e.target.value)}} defaultValue='5'>
                            {values.map(value => <option value={value}>{value}</option>)}
                        </select>
                    </div>
                </div>             
            </div>
            <div className='map-filter__distance'>
                <p className='map-filter__distance-title'>select a max distance</p>
                <div className='map-filter__distance-item'>
                    <input className='map-filter__distance-input' type='number' onChange={e => {e.preventDefault(); handleSetDistance(e.target.value)}}/>
                    <p className='map-filter__distance-txt'>km</p>
                </div>
            </div>
            <div className='map-filter__fil'>
                <p className='map-filter__fil-title'>select a min restaurant rating</p>
                <select className='map-filter__fil-select' onChange={e => {e.preventDefault(); setRating(e.target.value)}} defaultValue='0'>
                    {values.map(value => <option value={value}>{value}</option>)}
                </select>
            </div>
            <div className='map-filter__fil'>
                <p className='map-filter__fil-title'>select a prefered restaurant category</p>
                <CategorySelector setRestaurantCategory={setFilteredCategory}/>
            </div>
            <div className='map-filter__calendar'>
                <Calendar setEventDate={setPreferedDate}/>
            </div>
        </div>
    )
}
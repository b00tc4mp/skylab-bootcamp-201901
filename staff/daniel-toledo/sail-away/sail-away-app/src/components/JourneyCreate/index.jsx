'use strict'

import React, { useState, useEffect } from 'react'
import { Route, withRouter, Link } from 'react-router-dom'
import logic from '../../logic'
import MapRoute from '../MapRoute'
import DateRange from '../DateRange'
import seaData from '../../sea-data'

import './index.sass'

function JourneyCreate(props) {

    let route
    let dates
    let [description, setDescription] = useState('')
    let [seaSelection, setSeaSelection] = useState({
        name: 'North Pacific Ocean',
        center: {
            lat: 35.468199,
            lng: -148.519270
        },
        zoom: 3
    })

    function handleSeaSelection(event) {
        let seaName = event.target.value

        try {
            let sea = logic.findSea(seaName)
            setSeaSelection(sea)

        } catch (error) {
            console.error(error)
        }
    }

    function handleDates(date1, date2) {
        dates = [date1, date2]
    }

    function handleRoute(coordenates) {
        route = coordenates
    }

    async function handleOnSubmit() {
        try {
            
            let id= await logic.generateJourney(seaSelection, route, dates, description)
            console.log(id)
            props.history.push('/')
        
        } catch (error) {
            console.error(error)
        }
    }

    return (<main className="journey">
        <h3 className='text-center'>Sea or Ocean to discover</h3>
        <select name="seas" className='journey__sea' onChange={handleSeaSelection}>
            {
                seaData.map(sea => <option value={sea.name} >{sea.name}</option>)
            }
        </select>
        <h3 className='text-center'>Design your journey</h3>
        <div className='journey__map'>
            <MapRoute getRoute={handleRoute} seaSelection={seaSelection} />
        </div>

        <h3 className='text-center'>Sailing days</h3>
        <div className='journey__calendar'>
            <DateRange getDates={handleDates} />
        </div>

        <h3 className='text-center'>Description</h3>
        <div className='journey__description'>
            <textarea onChange={e => setDescription(e.target.value)}></textarea>
        </div>

        <button onClick={handleOnSubmit}>Submit</button>
    </main>)
}

export default withRouter(JourneyCreate)
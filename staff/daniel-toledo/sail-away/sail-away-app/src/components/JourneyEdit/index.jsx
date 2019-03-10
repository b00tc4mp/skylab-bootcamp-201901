'use strict'

import React, { useState, useEffect } from 'react'
import { Route, withRouter, Link } from 'react-router-dom'
import logic from '../../logic'
import MapRoute from '../MapRoute'
import DateRange from '../DateRange'
import seaData from '../../sea-data'

import './index.sass'

function JourneyEdit(props) {

    const { id } = props.match.params

    let [route, setRoute] = useState([])
    let dates
    let [description, setDescription] = useState('')
    let [seaSelection, setSeaSelection] = useState(null)
   
    async function getJourney(id) {
        try {
            let journey = await logic.retrieveJourney(id)

            setRoute(journey.route)
            dates = journey.dates
            setDescription(journey.description)
            setSeaSelection(journey.sea)
       
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getJourney(id)

    }, [])

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

    function handleMarkers(coordenates) {
        setRoute(coordenates)  //rute is an array of markers
    }

    async function handleOnSubmit(event) {
        event.preventDefault()

        try {
            debugger
            let newJourney = await logic.updateJourney(id, seaSelection, route, dates, description)
            debugger
            console.log(newJourney)
            props.history.push('/')

        } catch (error) {
            console.error(error)
        }
    }

    return (<main className="journey">
        <h3 className='text-center'>Sea or Ocean to discover</h3>
        {seaSelection && <select name="seas" className='journey__sea' onChange={handleSeaSelection} value={seaSelection.name}>
            {
                seaData.map(sea => {

                    return <option value={sea.name} >{sea.name}</option>
                })
            }
        </select>}
        <h3 className='text-center'>Design your journey</h3>
        <div className='journey__map'>
            {seaSelection && <MapRoute getMarkers={handleMarkers} seaSelection={seaSelection} initialMarkers={route} />}
        </div>

        <h3 className='text-center'>Sailing days</h3>
        <div className='journey__calendar'>
            <DateRange getDates={handleDates} />
        </div>

        <h3 className='text-center'>Description</h3>
        {description && <div className='journey__description'>
            <textarea onChange={e => setDescription(e.target.value)}>{description}</textarea>
        </div>}

        <button onClick={event => handleOnSubmit(event)}>Edit Journey</button>
    </main>)
}

export default withRouter(JourneyEdit)
'use strict'

import React, { useState, useEffect } from 'react'
import { Route, withRouter, Link } from 'react-router-dom'
import { data, mongoose, models } from 'sail-away-data'
import logic from '../../logic'
import MapRoute from '../MapRoute'
import DateRange from '../DateRange'
import Talents from '../Talents'
import Experience from '../Experience'
import Language from '../Language'

import './index.sass'

function JourneyEdit(props) {

    const { id } = props.match.params

    let [seaIdSelection, setSeaIdSelection] = useState('00')
    let [route, setRoute] = useState([])
    let [dates, setDates]=useState([])
    let [title, setTitle] = useState('')
    let [description, setDescription] = useState('')
    let [talents, setTalents] = useState([])
    let [experience, setExperience] = useState(null)
    let [languages, setLanguages] = useState([])

    async function getJourney(id) {
        try {
            let journey = await logic.retrieveJourney(id)

            setRoute(journey.route)
            setDates(journey.dates)
            setDescription(journey.description)
            setSeaIdSelection(journey.seaId)
            setTitle(journey.title)
            setTalents(journey.lookingFor.talents)
            setExperience(Number(journey.lookingFor.experience))
            setLanguages(journey.lookingFor.languages)
            debugger

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
            let seaId = logic.findSeaId(seaName)
            setSeaIdSelection(seaId)

        } catch (error) {
            console.error(error)
        }
    }

    function handleMarkers(coordenates) {
        setRoute(coordenates)  //rute is an array of markers
    }

    function handleDates(date1, date2) {
        dates = [date1, date2]
    }

    function handleTalents(talents) {
        setTalents(talents)
        console.log(talents)
    }

    function handleExperience(experience) {
        setExperience(experience)
        console.log(experience)
    }

    function handleLanguage(languages) {
        setLanguages(languages)
        console.log(languages)
    }


    async function handleOnSubmit(event) {
        event.preventDefault()

        try {
            let userId = mongoose.Types.ObjectId('5c86b278745af708ec95bbbe') //To practice

            let boat = {
                name: 'saphiro',
                type: 'Yacht',
                model: 416,
                description: 'amazing vessel'
            }
            let sailingTitles = []
            let newJourney = await logic.updateJourney(id, title, seaIdSelection, route, dates, description, userId, boat, talents, experience, sailingTitles, languages)
            debugger
            console.log(newJourney)
            props.history.push('/')

        } catch (error) {
            console.error(error)
        }
    }
    return (<main className="journey">
        <h3 className='text-center'>Sea or Ocean to discover</h3>
        {<select name="seas" className='journey__sea' onChange={handleSeaSelection}>
            {
                data.seas.map(seaData => {
                    if (seaIdSelection === seaData.id) return <option value={seaData.name} key={seaData.id} selected>{seaData.name}</option>
                    else { return <option value={seaData.name} key={seaData.id}>{seaData.name}</option> }
                })
            }
        </select>}
        <h3 className='text-center'>Design your journey</h3>
        <div className='journey__map'>
            {route.length && <MapRoute getMarkers={handleMarkers} seaIdSelection={seaIdSelection} initialMarkers={route} />}
        </div>

        <h3 className='text-center'>Sailing days</h3>
        <div className='journey__calendar'>
            {dates.length && <DateRange getDates={handleDates} initialDates={dates} />}
        </div>

        <h3 className='text-center'>Title</h3>
        <div className='journey__description'>
            <input onChange={e => setTitle(e.target.value)} value={title ? title : ''}></input>
        </div>

        <h3 className='text-center'>Description</h3>
        <div className='journey__description'>
            <textarea onChange={e => setDescription(e.target.value)} value={description ? description : ''}></textarea>
        </div>

        <h3 className='text-center'>Boat</h3>

        <div>
            <h3 className='text-center'>Looking for</h3>
            <h5>Talents</h5>
            {talents.length && <Talents getChecks={handleTalents} initialChecks={talents} />}
            <h5>Experience</h5>
            {experience !== null && <Experience getExperience={handleExperience} initialExperience={experience} />}
            <h5>Sailing titles</h5>
            <h5>Language</h5>
            {languages.length && <Language getLanguages={handleLanguage} initialLanguages={languages} />}
        </div>

        <button onClick={event => handleOnSubmit(event)}>Edit Journey</button>
    </main>)
}

export default withRouter(JourneyEdit)
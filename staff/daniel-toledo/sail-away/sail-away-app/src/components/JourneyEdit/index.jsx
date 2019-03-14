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
import BoatInfo from '../BoatInfo'

import './index.sass'

function JourneyEdit(props) {

    const { id } = props.match.params

    let [seaIdSelection, setSeaIdSelection] = useState('00')
    let [route, setRoute] = useState([])
    let [dates, setDates] = useState([])
    let [title, setTitle] = useState('')
    let [description, setDescription] = useState('')
    let [talents, setTalents] = useState([])
    let [experience, setExperience] = useState(null)
    let [languages, setLanguages] = useState([])
    let [boatSelected, setBoatSelected] = useState(null)
    let [boats, setBoats] = useState([])
    let [userId, setUserId] = useState('')

    async function getJourney(id) {
        try {
            let journey = await logic.retrieveJourney(id)
            let user = await getUser()
            debugger
            if (journey.userId !== user.id) throw Error('user not allowed to edit')
            setBoats(user.boats)
            setRoute(journey.route)
            setDates(journey.dates)
            setDescription(journey.description)
            setSeaIdSelection(journey.seaId)
            setTitle(journey.title)
            setTalents(journey.lookingFor.talents)
            setExperience(Number(journey.lookingFor.experience))
            setLanguages(journey.lookingFor.languages)
            setBoatSelected(journey.boat.id)
            setUserId(journey.userId)
            debugger

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        debugger
        getJourney(id)
    }, [])

    async function getUser() {
        try {
            return await logic.retrieveUserLogged()

        } catch (error) {
            console.error(error)
        }
    }

    function handleSeaSelection(event) {
        let seaName = event.target.value

        try {
            let seaId = logic.findSeaId(seaName)
            setSeaIdSelection(seaId)

        } catch (error) {
            console.error(error)
        }
    }

    function getBoat(boatSelected) {
        let boat = boats.find(boat => boat.id === boatSelected)
        return boat? boat : null
    }

    async function handleOnSubmit(event) {
        event.preventDefault()

        try {
            let sailingTitles = []
            let boat = getBoat(boatSelected)
            console.log(id, title, seaIdSelection, route, dates, description, userId, boat, talents, experience, sailingTitles, languages)
            let journeyEdited=await logic.updateJourney(id, title, seaIdSelection, route, dates, description, userId, boat, talents, experience, sailingTitles, languages)
            console.log(journeyEdited)
            props.history.push('/')

        } catch (error) {
            console.error(error)
        }
    }

    function handleBoatSelection(event) {
        let boatId = event.target.value === 'select your boat' ? null : event.target.value
        setBoatSelected(boatId)
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
            {route.length && <MapRoute getMarkers={coordenates => setRoute(coordenates)} seaIdSelection={seaIdSelection} initialMarkers={route} />}
        </div>

        <h3 className='text-center'>Sailing days</h3>
        <div className='journey__calendar'>
            {dates.length && <DateRange getDates={(date1, date2) => setDates([date1, date2])} initialDates={dates} />}
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
        {
            <select name="boats" onChange={handleBoatSelection}>
                <option value={null} key=''>select your boat</option>
                {boats &&
                    boats.map(boat => {
                        if (boatSelected === boat.id) return <option value={boat.id} key={boat.id} selected>{boat.name}</option>
                        else return <option value={boat.id} key={boat.id}>{boat.name}</option>
                    })
                }
            </select>
        }
        {getBoat(boatSelected) && <BoatInfo boat={getBoat(boatSelected)} />}

        <div>
            <h3 className='text-center'>Looking for</h3>
            <h5>Talents</h5>
            {talents.length && <Talents getChecks={talents => setTalents(talents)} initialChecks={talents} />}
            <h5>Experience</h5>
            {experience !== null && <Experience getExperience={experience => {console.log(experience);setExperience(Number(experience))}} initialExperience={experience} />}
            <h5>Sailing titles</h5>
            <h5>Language</h5>
            {languages.length && <Language getLanguages={languages => setLanguages(languages)} initialLanguages={languages} />}
        </div>

        <button onClick={event => handleOnSubmit(event)}>Edit Journey</button>
    </main>)
}

export default withRouter(JourneyEdit)
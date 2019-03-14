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

function JourneyCreate(props) {

    let [seaIdSelection, setSeaIdSelection] = useState('00')
    let [route, setRoute] = useState([])
    let [dates, setDates] = useState([])
    let [title, setTitle] = useState('')
    let [description, setDescription] = useState('')
    let [talents, setTalents] = useState([])
    let [experience, setExperience] = useState(0)
    let [languages, setLanguages] = useState([])
    let [boatSelected, setBoatSelected] = useState(null)
    let [boats, setBoats] = useState([])
    let [userId, setUserId] =useState('')

    useEffect(() => {
        getUser()
    }, [boatSelected])

    function handleSeaSelection(event) {
        let seaName = event.target.value

        try {
            let seaId = logic.findSeaId(seaName)
            setSeaIdSelection(seaId)

        } catch (error) {
            console.error(error)
        }
    }

    async function getUser() {
        try {
            debugger
            let user = await logic.retrieveUserLogged()
            setUserId(user.id)
            setBoats(user.boats)

        } catch (error) {
            console.error(error)
        }
    }

    function getBoat(boatSelected){
        return boats.find(boat => boat.id === boatSelected)
    }

    async function handleOnSubmit() {
        try {
            let sailingTitles = []
            let boat=getBoat(boatSelected)
            let id = await logic.generateJourney(title, seaIdSelection, route, dates, description, userId, boat, talents, experience, sailingTitles, languages)
            console.log(id)
            props.history.push('/')

        } catch (error) {
            console.error(error)
        }
    }

    function handleBoatSelection(event){
        let boatId= event.target.value ==='select your boat'? null : event.target.value
        setBoatSelected(boatId) 
    }

    return (<main className="journey">
        <h3 className='text-center'>Sea or Ocean to discover</h3>
        <select name="seas" className='journey__sea' onChange={handleSeaSelection}>
            {
                data.seas.map(sea => <option value={sea.name} key={sea.id}>{sea.name}</option>)
            }
        </select>
        <h3 className='text-center'>Design your journey</h3>
        <div className='journey__map'>
            <MapRoute getMarkers={coordenates => setRoute(coordenates)} seaIdSelection={seaIdSelection} initialMarkers={[]} />
        </div>

        <h3 className='text-center'>Sailing days</h3>
        <div className='journey__calendar'>
            <DateRange getDates={(date1, date2) => setDates([date1, date2])} initialDates={[null, null]} />
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
        <select name="boats" onChange={handleBoatSelection}>
            <option value={null} key=''>select your boat</option>
            {boats &&
                boats.map(boat => <option value={boat.id} key={boat.id}>{boat.name}</option>)
            }
        </select>
        {boatSelected && <BoatInfo boat={getBoat(boatSelected)} />}

        <div>
            <h3 className='text-center'>Looking for</h3>
            <h5>Talents</h5>
            <Talents getChecks={talents => setTalents(talents)} initialChecks={[]} />
            <h5>Experience</h5>
            <Experience getExperience={experience => setExperience(experience)} initialExperience={0} />
            <h5>Sailing titles</h5>
            <h5>Language</h5>
            <Language getLanguages={languages => setLanguages(languages)} initialLanguages={[]} />
        </div>

        <button onClick={handleOnSubmit}>Create Journey</button>
    </main>)
}

export default withRouter(JourneyCreate)
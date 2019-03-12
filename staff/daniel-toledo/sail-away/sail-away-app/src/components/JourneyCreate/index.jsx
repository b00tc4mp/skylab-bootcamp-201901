'use strict'

import React, { useState, useEffect } from 'react'
import { Route, withRouter, Link } from 'react-router-dom'
import { data, mongoose, models} from 'sail-away-data'
import logic from '../../logic'
import MapRoute from '../MapRoute'
import DateRange from '../DateRange'
import Talents from '../Talents'
import Experience from '../Experience'
import Language from '../Language'

import './index.sass'

function JourneyCreate(props) {

    let [seaIdSelection, setSeaIdSelection] = useState('00')
    let [route, setRoute] = useState([])
    let [dates, setDates]=useState([])
    let [title, setTitle] = useState('')
    let [description, setDescription] = useState('')
    let [talents, setTalents] = useState([])
    let [experience, setExperience] = useState(0)
    let [languages, setLanguages] = useState([])

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
        setDates([date1, date2])
    }

    function handleTalents(talents) {
        setTalents(talents)
        console.log(talents)
    }

    function handleExperience(experience){
        setExperience(experience)
        console.log(experience)
    }

    function handleLanguage(languages){
        setLanguages(languages)
        console.log(languages)
    }


    async function handleOnSubmit() {
        try {
            let userId=mongoose.Types.ObjectId('5c86b278745af708ec95bbbe') //To practice
        
            let boat={
                name: 'saphiro',
                type: 'Yacht',
                model: 416,
                description: 'amazing vessel'
            }
            let sailingTitles= []
            let id = await logic.generateJourney(title, seaIdSelection, route, dates, description, userId, boat, talents, experience, sailingTitles, languages)
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
                data.seas.map(sea => <option value={sea.name} key={sea.id}>{sea.name}</option>)
            }
        </select>
        <h3 className='text-center'>Design your journey</h3>
        <div className='journey__map'>
            <MapRoute getMarkers={handleMarkers} seaIdSelection={seaIdSelection} initialMarkers={[]} />
        </div>

        <h3 className='text-center'>Sailing days</h3>
        <div className='journey__calendar'>
            <DateRange getDates={handleDates} initialDates={[null, null]}/>
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
            <Talents getChecks={handleTalents} initialChecks={[]} />
            <h5>Experience</h5>
            <Experience getExperience={handleExperience} initialExperience={0} />
            <h5>Sailing titles</h5>
            <h5>Language</h5>
            <Language getLanguages={handleLanguage} initialLanguages={[]} />
        </div>

        <button onClick={handleOnSubmit}>Submit</button>
    </main>)
}

export default withRouter(JourneyCreate)
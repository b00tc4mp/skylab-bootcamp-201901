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

    const { id } = props.match.params
    const { isEdit } = props
    
    let [seaIdSelection, setSeaIdSelection] = useState('00')
    let [route, setRoute] = useState(null)
    let [dates, setDates] = useState(null)
    let [title, setTitle] = useState('')
    let [description, setDescription] = useState('')
    let [talents, setTalents] = useState(null)
    let [experience, setExperience] = useState(null)
    let [languages, setLanguages] = useState(null)
    let [boatSelected, setBoatSelected] = useState(null)
    let [boats, setBoats] = useState(null)
    let [userId, setUserId] = useState('')
  
    useEffect(() => {
        if (isEdit) getJourney(id)
        else {
            let userGet = getUser()
            Promise.resolve(userGet)
                .then(user => {
                    setUserId(user.id)
                    setBoats(user.boats)

                    setRoute([])
                    setDates([null, null])
                    setSeaIdSelection('00')
                    setTalents([])
                    setExperience(0)
                    setLanguages([])

                })
        }

    }, [])

    async function getJourney(id) {
        try {
            let journey = await logic.retrieveJourney(id)
            let user = await getUser()
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

        } catch (error) {
            console.error(error)
        }
    }

    async function getUser() {
        try {
            let user = await logic.retrieveUserLogged()
            setUserId(user.id)
            return user

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
        return boat ? boat : null
    }

    async function handleOnSubmit() {
        try {
            let sailingTitles = []
            let boat = getBoat(boatSelected)
            if (isEdit) await logic.updateJourney(id, title, seaIdSelection, route, dates, description, userId, boat, talents, experience, sailingTitles, languages)
            else await logic.generateJourney(title, seaIdSelection, route, dates, description, userId, boat, talents, experience, sailingTitles, languages)
            props.history.push('/')

        } catch (error) {
            console.error(error)
        }
    }

    function handleBoatSelection(event) {
        let boatId = event.target.value === 'select your boat' ? null : event.target.value
        setBoatSelected(boatId)
    }

    return (<div className="createJourney__background">
        <main className="createJourney">
            <h3 className='createJourney__title'>Sea or Ocean to discover</h3>
            <div className='createJourney__sea'>
                <select name="seas" onChange={handleSeaSelection}>
                    {
                        data.seas.map(seaData => {
                            if (seaIdSelection === seaData.id) return <option value={seaData.name} key={seaData.id} selected>{seaData.name}</option>
                            else { return <option value={seaData.name} key={seaData.id}>{seaData.name}</option> }
                        })
                    }
                </select>
            </div>
            <h3 className='createJourney__title'>Design your journey</h3>
            <div className='createJourney__map'>
                {route !== null && <MapRoute getMarkers={coordenates => setRoute(coordenates)} seaIdSelection={seaIdSelection} initialMarkers={route} />}
            </div>

            <h3 className='createJourney__title'>Sailing days</h3>
            <div className='createJourney__calendar'>
                {dates !== null && <DateRange getDates={(date1, date2) => setDates([date1, date2])} initialDates={dates} />}
            </div>

            <h3 className='createJourney__title'>Title</h3>
            <div className='createJourney__titleJourney'>
                <input onChange={e => setTitle(e.target.value)} value={title ? title : ''}></input>
            </div>

            <h3 className='createJourney__title'>Description</h3>
            <div className='createJourney__description'>
                <textarea onChange={e => setDescription(e.target.value)} value={description ? description : ''}></textarea>
            </div>

            <h3 className='createJourney__title'>Boat</h3>
            <div className='createJourney__boat'>
                <select name="boats" onChange={handleBoatSelection}>
                    <option value={null} key=''>select your boat</option>
                    {boats !== null &&
                        boats.map(boat => {
                            if (boatSelected === boat.id) return <option value={boat.id} key={boat.id} selected>{boat.name}</option>
                            else return <option value={boat.id} key={boat.id}>{boat.name}</option>
                        })
                    }
                </select>
            </div>
            <div className='createJourney__boatSelected'>
                {boatSelected && <BoatInfo boat={getBoat(boatSelected)} />}
            </div>

            <div>
                <h3 className='createJourney__lookingFor'>Looking for...</h3>
                <h5 className='createJourney__title'>Talents</h5>
                {talents !== null && <Talents getChecks={talents => setTalents(talents)} initialChecks={talents} />}
                <h5 className='createJourney__title'>Experience</h5>
                <div className='createJourney__experience'>
                    {experience !== null && <Experience getExperience={experience => setExperience(experience)} initialExperience={experience} />}
                </div>
                <h5 className='createJourney__title'>Language</h5>
                <div className='createJourney__languages'>
                    {languages !== null && <Language getLanguages={languages => setLanguages(languages)} initialLanguages={languages} />}
                </div>
            </div>

            <div className='createJourney__submit'>
                <button onClick={handleOnSubmit} className='createJourney__submit-button' >Create Journey</button>
            </div>
        </main>
    </div>)
}

export default withRouter(JourneyCreate)
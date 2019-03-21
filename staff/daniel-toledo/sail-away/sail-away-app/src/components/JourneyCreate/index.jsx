'use strict'

import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'

import MapRoute from '../MapRoute'
import DateRange from '../DateRange'
import Talents from '../Talents'
import Experience from '../Experience'
import Language from '../Language'
import BoatInfo from '../BoatInfo'
import Feedback from '../Feedback'

import data from '../../data'
import logic from '../../logic'
import './index.sass'

function JourneyCreate(props) {

    const { id } = props.match.params
    const { isEdit } = props
    const [feedback, setfeedback] = useState('')

    
    const [seaIdSelection, setSeaIdSelection] = useState('00')
    const [route, setRoute] = useState(null)
    const [dates, setDates] = useState(null)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [talents, setTalents] = useState(null)
    const [experience, setExperience] = useState(null)
    const [languages, setLanguages] = useState(null)
    const [boatSelected, setBoatSelected] = useState(null)
    const [boats, setBoats] = useState(null)
    const [userId, setUserId] = useState('')
  
    useEffect(() => {
        if (isEdit) getJourney(id)
        else {
            const userGet = getUser()
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
            const journey = await logic.retrieveJourney(id)
            const user = await getUser()
            if (journey.userId !== user.id) throw Error('user not allowed to edit')
            setfeedback('')
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
            setfeedback(error.message)
        }
    }

    async function getUser() {
        try {
            let user = await logic.retrieveUserLogged()
            setUserId(user.id)
            setfeedback('')
            return user

        } catch (error) {
            setfeedback(error.message)
        }
    }

    function handleSeaSelection(event) {
        let seaName = event.target.value

        try {
            let seaId = logic.findSeaId(seaName)
            setSeaIdSelection(seaId)
            setfeedback('')

        } catch (error) {
            setfeedback(error.message)
        }
    }

    function getBoat(boatSelected) {
        let boat = boats.find(boat => boat.id === boatSelected)
        return boat ? boat : null
    }

    async function handleOnSubmit() {
        try {
            let journeyCreated
            let boat = getBoat(boatSelected)
            let datesString=[dates[0].toString().substring(0,15), dates[1].toString().substring(0,15)]
            if (isEdit) journeyCreated= await logic.updateJourney(id, title, seaIdSelection, route, datesString, description, userId, boat, talents, experience, languages)
            else journeyCreated= await logic.generateJourney(title, seaIdSelection, route, dates, description, userId, boat, talents, experience, languages)
            setfeedback('')
           
            props.history.push(`/journey/${journeyCreated.id}`)

        } catch (error) {
            setfeedback(error.message)
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

            {feedback ? <Feedback message={feedback} /> : <div />}
            <div className='createJourney__submit'>
                <button onClick={handleOnSubmit} className='createJourney__submit-button' >Create Journey</button>
            </div>
        </main>
    </div>)
}

export default withRouter(JourneyCreate)
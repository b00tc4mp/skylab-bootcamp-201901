'use strict'

import React, { useState, useEffect } from 'react'
import { Route, withRouter, Link } from 'react-router-dom'

import SlideShow from '../SlideShow'
import BoatInfo from '../BoatInfo'
import Boat from '../Boat'
import Talents from '../Talents'
import Experience from '../Experience'
import Language from '../Language'

import { data, mongoose, models } from 'sail-away-data'
import logic from '../../logic'

import './index.sass'

function EditProfile(props) {

    const { id } = props.match.params
    const { initialUser } = props
    const nationalities = data.nationalities
    let [addBoat, setAddBoat] = useState(false)

    let [pictures, setPictures] = useState([])
    let [name, setName] = useState('')
    let [surname, setSurname] = useState('')
    let [gender, setGender] = useState('')
    let [nationality, setNationality] = useState('')
    let [birthday, setBirthday] = useState('')
    let [description, setDescription] = useState('')
    let [boats, setBoats] = useState([])
    let [boatIdToEdit, setBoatIdToEdit] = useState('')
    let [talents, setTalents] = useState([])
    let [experience, setExperience] = useState(0)
    let [languages, setLanguages] = useState([])

    async function getUser() {
        try {
            let user = await logic.retrieveUser()

            setPictures(user.pictures)
            setName(user.name)
            setSurname(user.surname)
            setGender(user.gender)
            setNationality(user.nationality)
            setBirthday(user.birthday)
            setDescription(user.birthday)
            setBoats(user.boats)
            setTalents(user.talents)
            setExperience(user.experience)
            setLanguages(user.languages)
            debugger
        
        } catch (error) {
            console.error(error)
        }
    }


    useEffect(() => {
        debugger
        getUser()
    }, [])

    function handleSetAddBoat(boat) {
        boats = [...boats, boat]
        setBoats(boats)
        setAddBoat(false)
    }

    function handleSetEditBoat(boatEdited) {
        try {
            let index = boats.findIndex(boat => boat.id === boatEdited.id)
            boats.splice(index, 1, boatEdited)
            setBoats(boats)
            setBoatIdToEdit('')

        } catch (error) {
            console.error(error)
        }

    }

    function handleDeleteBoat(boatDeleted) {
        try {
            let newBoats = boats.filter(boat => boat.id !== boatDeleted.id)
            setBoats(newBoats)
            setBoatIdToEdit('')

        } catch (error) {
            console.error(error)
        }
    }

    async function handleOnSubmit() {
        try {
            let id = await logic.updateUser(pictures, name, surname, gender, nationality, birthday, description, boats, talents, experience, languages)
            console.log(id)
            props.history.push('/')

        } catch (error) {
            console.error(error)
        }
    }

    return (<section className="edit-profile">
        <div className='d-flex'>
            <div className='edit-profile__picture'>
                <SlideShow pictures={pictures} />

            </div>
            <div>
                <label htmlFor="name">Name</label>
                <input onChange={e => setName(e.target.value)} type="text" name="name" value={name} required />
                <label htmlFor="surname">Surname</label>
                <input onChange={e => setSurname(e.target.value)} type="text" name="surName" value={surname} required />

            </div>
        </div>

        <h3 className='text-center'>General Info</h3>
        <div className='general-info'>
            <div className='gender'>
                <label htmlFor="gender">Gender</label>
                <select name="gender" onChange={e => setGender(e.target.value)} value={gender}>
                    <option value='masculine' key='masculine'>Masculine</option>
                    <option value='femenine' key='femenine'>Femenine</option>
                    <option value='indiferent' key='indiferent'>Indiferent</option>
                </select>
            </div>

            <div className='nacionality'>
                <label htmlFor="nationality">Nationality</label>
                <select name="nationality" onChange={e => setNationality(e.target.value)} value={nationality}>

                    {
                        nationalities.map(nacionality =>
                            <option
                                value={nacionality.nationality}
                                key={nacionality.num_code}>
                                {nacionality.nationality}
                            </option>)
                    }
                </select>
            </div>
        </div>

        <h3 className='text-center'>Description</h3>
        <div className='journey__description'>
            <textarea onChange={e => setDescription(e.target.value)} value={description}></textarea>
        </div>

        <h3 className='text-center'>Boats</h3>
        {boats.length &&
            boats.map(boat => {
                debugger
                if (boat.id === boatIdToEdit) { return <Boat getBoat={handleSetEditBoat} initialBoat={boat} CancelBoat={() => setAddBoat(false)} /> }
                else return <BoatInfo getEdit={() => setBoatIdToEdit(boat.id)} getDelete={handleDeleteBoat} boat={boat} />
            })
        }
        {addBoat ? <Boat getBoat={handleSetAddBoat} initialBoat={null} cancelBoat={() => setAddBoat(false)} /> : <div />}
        <button onClick={() => setAddBoat(true)}>Add Boat</button>

        <div>
            <h3 className='text-center'>Find the best match!</h3>
            <h5>Talents</h5>
            <Talents getChecks={talents => setTalents(talents)} initialChecks={[]} />
            <h5>Experience</h5>
            <Experience getExperience={experience => setExperience(experience)} initialExperience={0} />
            <h5>Sailing titles</h5>
            <h5>Language</h5>
            <Language getLanguages={languages => setLanguages(languages)} initialLanguages={[]} />
        </div>

        <button onClick={handleOnSubmit}>Submit</button>
    </section>)
}


export default withRouter(EditProfile)
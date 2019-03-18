'use strict'

import React, { useState, useEffect } from 'react'
import { Route, withRouter, Link } from 'react-router-dom'

import SlideShow from '../SlideShow'
import BoatInfo from '../BoatInfo'
import Boat from '../Boat'
import Talents from '../Talents'
import Experience from '../Experience'
import Language from '../Language'
import UpdatePictures from '../UpdatePictures'

import { data, mongoose, models } from 'sail-away-data'
import logic from '../../logic'

import './index.sass'

function EditProfile(props) {

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
    let [talents, setTalents] = useState(null)
    let [experience, setExperience] = useState(null)
    let [languages, setLanguages] = useState(null)

    async function getUser() {
        try {
            let user = await logic.retrieveUserLogged()

            setPictures(user.pictures)
            setName(user.name)
            setSurname(user.surname)
            setGender(user.gender)
            setNationality(user.nationality)
            setBirthday(user.birthday)
            setDescription(user.description)
            setBoats(user.boats)
            setTalents(user.talents)
            setExperience(Number(user.experience))
            setLanguages(user.languages)


        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
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


    return (<div className="profileEdit__background">

        <section className="profileEdit">

            <div className='profileEdit__header-background'>
                <div className='profileEdit__header'>
                    <div className='profileEdit__picture'>
                        <UpdatePictures getPictures={pictures => setPictures(pictures)} />
                        <SlideShow pictures={pictures} />

                    </div>
                    <div className='profileEdit__names'>
                        <div className='profileEdit__inputs'>
                            <input onChange={e => setName(e.target.value)} type="text" name="name" value={name} placeholder='Name' required />
                        </div>
                        <div className='profileEdit__inputs'>
                            <input onChange={e => setSurname(e.target.value)} type="text" name="surName" value={surname} placeholder='Surname' required />
                        </div>

                    </div>
                </div>
            </div>

            <div className='profileEdit__info'>


                <h3 className='profileInfo__titleSection'>General Info</h3>

                <div className='profileEdit__general'>
                    <label htmlFor="gender" className=''>Gender</label>
                    <select name="gender" className='' onChange={e => setGender(e.target.value)} value={gender}>
                        <option value='masculine' key='masculine'>Masculine</option>
                        <option value='femenine' key='femenine'>Femenine</option>
                        <option value='indiferent' key='indiferent'>Indiferent</option>
                    </select>
                </div>

                <div className='profileEdit__general'>
                    <label htmlFor="nationality" className=''>Nationality</label>
                    <select name="nationality" className='' onChange={e => setNationality(e.target.value)} value={nationality}>

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

                <h3 className='profileInfo__titleSection'>Description</h3>
                <div>
                    <textarea onChange={e => setDescription(e.target.value)} value={description} className='profileEdit__description'></textarea>
                </div>

                <h3 className='profileInfo__titleSection'>Boats</h3>
                {boats.length &&
                    boats.map(boat => {
                        if (boat.id === boatIdToEdit) { return <Boat getBoat={handleSetEditBoat} initialBoat={boat} CancelBoat={() => setAddBoat(false)} /> }
                        else return <BoatInfo getEdit={() => setBoatIdToEdit(boat.id)} getDelete={handleDeleteBoat} boat={boat} key={boat.id} />
                    })
                }
                {addBoat ? <Boat getBoat={handleSetAddBoat} initialBoat={null} cancelBoat={() => setAddBoat(false)} /> : <div />}
                <button onClick={() => setAddBoat(true)} className='profileEdit__addBoat'>Add Boat</button>

                <div>
                    <h3 className='profileInfo__titleSection'>More...</h3>
                    <h5>Talents</h5>
                    {talents !== null && <Talents getChecks={talents => setTalents(talents)} initialChecks={talents} />}
                    <h5>Experience</h5>
                    {experience !== null && <Experience getExperience={experience => setExperience(experience)} initialExperience={experience} />}
                    <h5>Language</h5>
                    {languages !== null && <Language getLanguages={languages => setLanguages(languages)} initialLanguages={languages} />}
                </div>

            </div>
            <div className='profileEdit__submit'>
                <button className='profileEdit__submit-button' onClick={handleOnSubmit}>Edit profile</button>
            </div>
        </section>
    </div >)
}


export default withRouter(EditProfile)
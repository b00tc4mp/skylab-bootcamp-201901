'use strict'

import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'

import SlideShow from '../SlideShow'
import BoatInfo from '../BoatInfo'
import Boat from '../Boat'
import Talents from '../Talents'
import Experience from '../Experience'
import Language from '../Language'
import UpdatePictures from '../UpdatePictures'
import Feedback from '../Feedback'

import data from '../../data'
import logic from '../../logic'

import './index.sass'

function EditProfile(props) {

    const nationalities = data.nationalities
    const [addBoat, setAddBoat] = useState(false)
    const [feedback, setfeedback] = useState('')
    const [pictures, setPictures] = useState([])
    const [picturesBlob, setPicturesBlob] = useState([])
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [gender, setGender] = useState('')
    const [nationality, setNationality] = useState('')
    const [birthday, setBirthday] = useState('')
    const [description, setDescription] = useState('')
    const [boats, setBoats] = useState([])
    const [boatIdToEdit, setBoatIdToEdit] = useState('')
    const [talents, setTalents] = useState(null)
    const [experience, setExperience] = useState(null)
    const [languages, setLanguages] = useState(null)

    async function getUser() {
        try {
            const user = await logic.retrieveUserLogged()

            setfeedback('')
            setPictures(user.pictures)
            setName(user.name)
            setSurname(user.surname)
            setGender(user.gender)
            setNationality(user.nationality)
            setBirthday(user.birthday ? user.birthday.substring(0, 10) : '')
            setDescription(user.description)
            setBoats(user.boats)
            setTalents(user.talents)
            setExperience(Number(user.experience))
            setLanguages(user.languages)
            setAddBoat(false)
            setBoatIdToEdit('')

        } catch (error) {
            setfeedback(error.message)
        }
    }

    useEffect(() => {
        getUser()

    }, [])

    async function getBoats() {
        try {
            let user = await logic.retrieveUserLogged()
            setfeedback('')
            setAddBoat(false)
            setBoatIdToEdit('')

            setBoats(user.boats)

        } catch (error) {
            setfeedback(error.message)
        }
    }

    async function handleDeleteBoat(boatDeleted) {
        try {
            let newBoats = boats.filter(boat => boat.id !== boatDeleted.id)
            setfeedback('')
            setBoats(newBoats)
            setBoatIdToEdit('')

        } catch (error) {
            setfeedback(error.message)
        }
    }

    async function handleOnSubmit() {
        try {
            let userId
            let pictures = picturesBlob.map(async p => await logic.updatePicture(p))
            await Promise.all(pictures)
                .then(() => logic.updateUser(name, surname, gender, nationality, birthday, description, boats, talents, experience, languages))
                .then(user => userId = user.id)
            setfeedback('')
            props.history.push(`/user/${userId}`)

        } catch (error) {
            setfeedback(error.message)
        }
    }

    function handleGetPictures(pictures) {

        let picturesURL = pictures.map(pictureBlob => {
            let image = new Image();
            image.src = URL.createObjectURL(pictureBlob);
            return image.src
        })

        setfeedback('')
        setPictures(picturesURL)
        setPicturesBlob(pictures)
    }

    function handleCancel() {
        setBoatIdToEdit('')
    }

    return (<div className="profileEdit__background">

        <section className="profileEdit">

            <div className='profileEdit__header-background'>
                <div className='profileEdit__header'>
                    <div className='profileEdit__picture'>
                        <UpdatePictures getPictures={handleGetPictures} />
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
                    <select name="gender" className='profileEdit__inputGen' onChange={e => setGender(e.target.value)} value={gender}>
                        <option value='' key=''>Select gender</option>
                        <option value='Masculine' key='masculine'>Masculine</option>
                        <option value='Feminine' key='femenine'>Femenine</option>
                        <option value='Indiferent' key='indiferent'>Indiferent</option>
                    </select>
                </div>

                <div className='profileEdit__general'>
                    <label htmlFor="nationality" className=''>Nationality</label>
                    <select name="nationality" className='profileEdit__inputGen' onChange={e => setNationality(e.target.value)} value={nationality}>
                        <option value='' key=''>Select nationality</option>
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

                <div className='profileEdit__general'>
                    <label htmlFor="birthday" >Birth day</label>
                    <input onChange={e => setBirthday(e.target.value)} className='profileEdit__inputGen' type="date" name="birthday" value={birthday} />
                </div>

                <h3 className='profileInfo__titleSection'>Description</h3>
                <div>
                    <textarea onChange={e => setDescription(e.target.value)} value={description} className='profileEdit__description'></textarea>
                </div>

                <h3 className='profileInfo__titleSection'>Boats</h3>
                {!!boats.length &&
                    boats.map(boat => {
                        if (boat.id === boatIdToEdit) { return <Boat getBoat={getBoats} initialBoat={boat} cancelBoat={handleCancel} /> }
                        else return <BoatInfo getEdit={() => setBoatIdToEdit(boat.id)} getDelete={handleDeleteBoat} boat={boat} key={boat.id} />
                    })
                }
                {addBoat ? <Boat getBoat={getBoats} initialBoat={null} cancelBoat={() => setAddBoat(false)} /> : <div />}
                <button onClick={() => setAddBoat(true)} className='profileEdit__addBoat'>Add Boat</button>

                <h3 className='profileInfo__titleSection'>More...</h3>
                <div className='profileEdit__more'>
                    <h5 className='profileEdit__titleSubSection'>Talents</h5>
                    {talents !== null && <Talents getChecks={talents => setTalents(talents)} initialChecks={talents} />}
                    <h5 className='profileEdit__titleSubSection'>Experience</h5>
                    {experience !== null && <Experience getExperience={experience => setExperience(experience)} initialExperience={experience} />}
                    <h5 className='profileEdit__titleSubSection'>Language</h5>
                    {languages !== null && <Language getLanguages={languages => setLanguages(languages)} initialLanguages={languages} />}
                </div>

            </div>
            {feedback ? <Feedback message={feedback} /> : <div />}
            <div className='profileEdit__submit'>
                <button className='profileEdit__submit-button' onClick={handleOnSubmit}>Edit profile</button>
            </div>
        </section>
    </div >)
}

export default withRouter(EditProfile)
'use strict'

import React, { useState, useEffect } from 'react'

import SlideShow from '../SlideShow'
import UpdatePictures from '../UpdatePictures'
import Feedback from '../Feedback'

import logic from '../../logic'
import './index.sass'

function Boat({ getBoat, initialBoat, cancelBoat }) {
    const emptyBoat = {
        id: `boat-${Math.floor(Math.random() * 100000).toString()}`,
        pictures: [],
        name: '',
        type: '',
        model: '',
        boatLength: '',
        crew: '',
        age: '',
        description: ''
    }

    const buttonName = initialBoat ? 'Edit boat' : 'Add new Boat'
    initialBoat = initialBoat ? initialBoat : emptyBoat

    const id = initialBoat.id
    const [pictures, setPictures] = useState(initialBoat.pictures)
    const [picturesBlob, setPicturesBlob] = useState([])
    const [name, setName] = useState(initialBoat.name)
    const [type, setType] = useState(initialBoat.type)
    const [model, setModel] = useState(initialBoat.model)
    const [boatLength, setBoatLength] = useState(initialBoat.boatLength)
    const [crew, setCrew] = useState(initialBoat.crew)
    const [age, setAge] = useState(initialBoat.age)
    const [description, setDescription] = useState(initialBoat.description)
    const [feedback, setfeedback] = useState('')

    async function handleFormBoat(event) {
        event.preventDefault()
        try {
            await logic.updateBoat({ id, pictures: [], name, type, model, boatLength, crew, age, description })
            const updatedBoatPictures = picturesBlob.map(async p => await logic.updateBoatPicture(p, id))
            Promise.all(updatedBoatPictures).then(() => getBoat())

        } catch (error) {
            setfeedback(error.message)
        }
    }


    function handleGetPictures(pictures) {

        const picturesURL = pictures.map(pictureBlob => {
            const image = new Image();
            image.src = URL.createObjectURL(pictureBlob);
            return image.src
        })

        setPictures(picturesURL)
        setPicturesBlob(pictures)
    }

    useEffect(() => {
        setPictures(pictures)
    }, [pictures])

    return (<section className="boat">
        <div className='boat__container'>
            <div className='boat__header'>
                <SlideShow pictures={pictures} isBoat={true} />
                <UpdatePictures getPictures={handleGetPictures} boatId={id} />

            </div>
            <form onSubmit={handleFormBoat} className='boat__form'>
                <div className='boat__infoEdit'>
                    <div className='boat__infoEdit-item-edit'>
                        <label htmlFor="name" className=''>Name</label>
                        <input onChange={e => setName(e.target.value)} className='' type="text" name="name" value={name} required />
                    </div>
                    <div className='boat__infoEdit-item-edit'>
                        <label htmlFor="type" className=''>Type</label>
                        <input onChange={e => setType(e.target.value)} className='' type="text" name="type" value={type} required />
                    </div>
                    <div className='boat__infoEdit-item-edit'>
                        <label htmlFor="model" className=''>Model</label>
                        <input onChange={e => setModel(e.target.value)} className='' type="text" name="model" value={model} />
                    </div>
                    <div className='boat__infoEdit-item-edit'>
                        <label htmlFor="length" className=''>Length</label>
                        <input onChange={e => setBoatLength(e.target.value)} className='' type="text" name="length" value={boatLength} />
                    </div>
                    <div className='boat__infoEdit-item-edit'>
                        <label htmlFor="crew" className=''>Crew that fits</label>
                        <input onChange={e => setCrew(e.target.value)} className='' type="text" name="crew" value={crew} required />
                    </div>
                    <div className='boat__infoEdit-item-edit'>
                        <label htmlFor="age" className=''>Age of the Boat</label>
                        <input onChange={e => setAge(e.target.value)} className='' type="text" name="age" value={age} required />
                    </div>
                    <div className='boat__infoEdit-item-edit-description'>
                        <label htmlFor="description" className=''>Description</label>
                        <textarea onChange={e => setDescription(e.target.value)} className='' type="text" name="description" value={description} required />
                    </div>
                </div>
                {feedback ? <Feedback message={feedback} /> : <div />}
                <div className='boat__buttons'>
                    <button type='submit'>{buttonName}</button>
                    <button type='button' onClick={() => cancelBoat()}>Cancel</button>
                </div>
            </form>
        </div>
    </section >)
}


export default Boat
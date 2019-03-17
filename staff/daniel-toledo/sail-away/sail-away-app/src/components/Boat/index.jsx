'use strict'

import React, { useState, useEffect } from 'react'
import { Route, withRouter, Link } from 'react-router-dom'

import SlideShow from '../SlideShow'
import UpdatePictures from '../UpdatePictures'

import './index.sass'

function Boat({ getBoat, initialBoat, cancelBoat }) {
    const emptyBoat = {
        id: `boat-${Math.floor(Math.random() * 100000).toString()}`,
        pictures: ['https://ak2.picdn.net/shutterstock/videos/22004452/thumb/2.jpg'],
        name: '',
        type: '',
        model: '',
        boatLength: '',
        crew: '',
        age: '',
        description: ''
    }

    let buttonName = initialBoat ? 'Edit boat' : 'Add new Boat'
    initialBoat = initialBoat ? initialBoat : emptyBoat

    const id = initialBoat.id

    let [pictures, setPictures] = useState(initialBoat.pictures)
    let [name, setName] = useState(initialBoat.name)
    let [type, setType] = useState(initialBoat.type)
    let [model, setModel] = useState(initialBoat.model)
    let [boatLength, setBoatLength] = useState(initialBoat.boatLength)
    let [crew, setCrew] = useState(initialBoat.crew)
    let [age, setAge] = useState(initialBoat.age)
    let [description, setDescription] = useState(initialBoat.description)

    function handleFormBoat(event) {
        event.preventDefault()
        debugger
        let boat = {
            id,
            pictures,
            name,
            type,
            model,
            boatLength,
            crew,
            age,
            description
        }

        getBoat(boat)
    }


    return (<section className="boat">
        <div className='boat__container'>
            <div className='boat__header'>

                <SlideShow pictures={pictures} />
                <UpdatePictures getPictures={pictures => setPictures(pictures)} />

            </div>
            <form onSubmit={handleFormBoat} className=''>
                <div className='boat__infoEdit'>
                    <div className='boat__infoEdit-item-edit'>
                        <label for="name" className=''>Name</label>
                        <input onChange={e => setName(e.target.value)} className='' type="text" name="name" value={name} required />
                    </div>
                    <div className='boat__infoEdit-item-edit'>
                        <label for="type" className=''>Type</label>
                        <input onChange={e => setType(e.target.value)} className='' type="text" name="type" value={type} required />
                    </div>
                    <div className='boat__infoEdit-item-edit'>
                        <label for="model" className=''>Model</label>
                        <input onChange={e => setModel(e.target.value)} className='' type="text" name="model" value={model} />
                    </div>
                    <div className='boat__infoEdit-item-edit'>
                        <label for="length" className=''>Length</label>
                        <input onChange={e => setBoatLength(e.target.value)} className='' type="text" name="length" value={boatLength} />
                    </div>
                    <div className='boat__infoEdit-item-edit'>
                        <label for="crew" className=''>Crew that fits</label>
                        <input onChange={e => setCrew(e.target.value)} className='' type="text" name="crew" value={crew} required />
                    </div>
                    <div className='boat__infoEdit-item-edit'>
                        <label for="age" className=''>Age of the Boat</label>
                        <input onChange={e => setAge(e.target.value)} className='' type="text" name="age" value={age} required />
                    </div>
                    <div className='boat__infoEdit-item-edit'>
                        <label for="description" className=''>Description</label>
                        <textarea onChange={e => setDescription(e.target.value)} className='' type="text" name="description" value={description} required />
                    </div>
                </div>
                <div className='boat__buttons'>
                    <button type='submit'>{buttonName}</button>
                    <button onClick={cancelBoat}>Cancel</button>
                </div>
            </form>
        </div>
    </section >)
}


export default Boat
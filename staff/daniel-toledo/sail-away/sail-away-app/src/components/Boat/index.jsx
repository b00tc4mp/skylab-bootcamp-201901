'use strict'

import React, { useState, useEffect } from 'react'
import { Route, withRouter, Link } from 'react-router-dom'

import SlideShow from '../SlideShow'

import { data, mongoose, models } from 'sail-away-data'
import logic from '../../logic'

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


    return (<section className="boat d-flex">

        <SlideShow pictures={pictures} />
        <form onSubmit={handleFormBoat} className='row'>
            <label for="name" className='col-4'>Name</label>
            <input onChange={e => setName(e.target.value)} className='col-8' type="text" name="name" value={name} required />
            <label for="type" className='col-4'>Type</label>
            <input onChange={e => setType(e.target.value)} className='col-8' type="text" name="type" value={type} required />
            <label for="model" className='col-4'>Model</label>
            <input onChange={e => setModel(e.target.value)} className='col-8' type="text" name="model" value={model} />
            <label for="length" className='col-4'>Length</label>
            <input onChange={e => setBoatLength(e.target.value)} className='col-8' type="text" name="length" value={boatLength} />
            <label for="crew" className='col-4'>Crew that fits</label>
            <input onChange={e => setCrew(e.target.value)} className='col-8' type="text" name="crew" value={crew} required />
            <label for="age" className='col-4'>Age of the Boat</label>
            <input onChange={e => setAge(e.target.value)} className='col-8' type="text" name="age" value={age} required />
            <label for="description" className='col-4'>Description</label>
            <textarea onChange={e => setDescription(e.target.value)} className='col-8' type="text" name="description" value={description} required />
            <button type='submit'>{buttonName}</button>
            <button onClick={cancelBoat}>Cancel</button>
        </form>
    </section>)
}


export default Boat
'use strict'

import React, { useState, useEffect } from 'react'
import { Route, withRouter, Link } from 'react-router-dom'

import SlideShow from '../SlideShow'
import UpdatePictures from '../UpdatePictures'

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

    let buttonName = initialBoat ? 'Edit boat' : 'Add new Boat'
    initialBoat = initialBoat ? initialBoat : emptyBoat

    const id = initialBoat.id
    // let [id, setId] = useState(initialBoat.id)
    let [pictures, setPictures] = useState(initialBoat.pictures)
    let [picturesBlob, setPicturesBlob] = useState([])
    let [name, setName] = useState(initialBoat.name)
    let [type, setType] = useState(initialBoat.type)
    let [model, setModel] = useState(initialBoat.model)
    let [boatLength, setBoatLength] = useState(initialBoat.boatLength)
    let [crew, setCrew] = useState(initialBoat.crew)
    let [age, setAge] = useState(initialBoat.age)
    let [description, setDescription] = useState(initialBoat.description)

    async function handleFormBoat(event) {
        event.preventDefault()
        try{
            let boat = {
                id,
                pictures:[],
                name,
                type,
                model,
                boatLength,
                crew,
                age,
                description
            }

            let updatedBoat= await logic.updateBoat(boat)

            let updatedBoatPictures = picturesBlob.map(async p => await logic.updateBoatPicture(p, boat.id))
            Promise.all(updatedBoatPictures).then(() => getBoat())
            // getBoat(boat)
        }catch(error){
            console.error(error)
        }
    }


 
    function handleGetPictures(pictures){

        let picturesURL = pictures.map(pictureBlob => {
            let image = new Image();
            image.src = URL.createObjectURL(pictureBlob);
            return image.src
        })

        setPictures(picturesURL)
        setPicturesBlob(pictures)
    }

    useEffect(()=>{
        setPictures(pictures)
    },[pictures])

    return (<section className="boat">
        <div className='boat__container'>
            <div className='boat__header'>
                <SlideShow pictures={pictures} isBoat={true} />
                <UpdatePictures getPictures={handleGetPictures} boatId={id}/>

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
                    <button type='button' onClick={()=> cancelBoat()}>Cancel</button>
                </div>
            </form>
        </div>
    </section >)
}


export default Boat
'use strict'

import React, { useState, useEffect } from 'react'
import { Route, withRouter, Link } from 'react-router-dom'

import SlideShow from '../SlideShow'

import { data, mongoose, models } from 'sail-away-data'
import logic from '../../logic'

function BoatInfo({ getEdit, getDelete, boat }) {

    useEffect(() => {

    }, [boat])

    return (<section className="boat">
        <div className='show-boat d-flex'>

            <SlideShow pictures={boat.pictures} />
            <div className='show-boat__info row'>
                <label htmlFor="name" className='col-4'>Name</label>
                <p className='col-8'>{boat.name}</p>
                <label htmlFor="type" className='col-4'>Type</label>
                <p className='col-8'>{boat.type}</p>
                <label htmlFor="model" className='col-4'>Model</label>
                <p className='col-8'>{boat.model}</p>
                <label htmlFor="boatLength" className='col-4'>Length</label>
                <p className='col-8'>{boat.boatLength}</p>
                <label htmlFor="crew" className='col-4'>crew that fits</label>
                <p className='col-8'>{boat.crew}</p>
                <label htmlFor="age" className='col-4'>Age</label>
                <p className='col-8'>{boat.age}</p>
                <label htmlFor="description" className='col-4'>Description</label>
                <p className='col-8'>{boat.description}</p>

            </div>

        </div>
        {getEdit && <button onClick={() => getEdit(boat)}>Edit boat</button>}
        {getDelete && <button onClick={() => getDelete(boat)}>Delete boat</button>}

    </section>)
}


export default BoatInfo
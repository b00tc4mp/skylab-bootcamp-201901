'use strict'

import React, { useEffect } from 'react'

import SlideShow from '../SlideShow'

import './index.sass'


function BoatInfo({ getEdit, getDelete, boat }) {

    useEffect(() => {

    }, [boat])

    return (<section className="boat">
        <div className='boat__container'>
            <div>
                <h3 className='boat__name text-center'>{boat.name}</h3>
                <SlideShow pictures={boat.pictures} />
            </div>
            <div className='boat__info'>

                <div className='row'>
                    <label htmlFor="type" className='col-3'>Type</label>
                    <p className='col-9'>{boat.type}</p>
                </div>
                <div className='row'>
                    <label htmlFor="model" className='col-3'>Model</label>
                    <p className='col-9'>{boat.model}</p>
                </div>
                <div className='row'>
                    <label htmlFor="boatLength" className='col-3'>Length</label>
                    <p className='col-9'>{boat.boatLength}</p>
                </div>
                <div className='row'>
                    <label htmlFor="crew" className='col-3'>Maximum crew</label>
                    <p className='col-9'>{boat.crew}</p>
                </div>
                <div className='row'>
                    <label htmlFor="age" className='col-3'>Age of the boat</label>
                    <p className='col-9'>{boat.age}</p>
                </div>
                <div className='row'>
                    <label htmlFor="description" className='col-3'>Description</label>
                    <p className='col-12'>{boat.description}</p>
                </div>

            </div>
        </div>

        <div className='boat__buttons'>
            {getEdit && <button onClick={() => getEdit(boat)}>Edit boat</button>}
            {getDelete && <button onClick={() => getDelete(boat)}>Delete boat</button>}
        </div>

    </section>)
}


export default BoatInfo
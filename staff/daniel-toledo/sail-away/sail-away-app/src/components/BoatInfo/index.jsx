'use strict'

import React, { useEffect } from 'react'

import SlideShow from '../SlideShow'

import './index.sass'


function BoatInfo({ getEdit, getDelete, boat }) {

    useEffect(() => {

    }, [boat])

    return (<section className="boat">
        <div className='boat__container'>
            <div className='boat__header'>
                <h3 className='boat__name'>{boat.name}</h3>
                <SlideShow pictures={boat.pictures} className='boat__picture'/>
            </div>
            <div className='boat__info'>

                <div className='boat__info-item'>
                    <label htmlFor="type" className=''>Type</label>
                    <p className=''>{boat.type}</p>
                </div>
                <div className='boat__info-item'>
                    <label htmlFor="model" className=''>Model</label>
                    <p className=''>{boat.model}</p>
                </div>
                <div className='boat__info-item'>
                    <label htmlFor="boatLength" className=''>Length</label>
                    <p className=''>{boat.boatLength}</p>
                </div>
                <div className='boat__info-item'>
                    <label htmlFor="crew" className=''>Maximum crew</label>
                    <p className=''>{boat.crew}</p>
                </div>
                <div className='boat__info-item'>
                    <label htmlFor="age" className=''>Age</label>
                    <p className=''>{boat.age}</p>
                </div>
                <div className='boat__info-item'>
                    <label htmlFor="description" className=''>Description</label>
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
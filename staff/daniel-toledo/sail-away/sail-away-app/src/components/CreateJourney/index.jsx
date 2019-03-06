'use strict'

import React, { useState, useEffect } from 'react'
import { Route, withRouter, Link } from 'react-router-dom'
import logic from '../../logic'
import MapRoute from '../MapRoute'
import DateRange from '../DateRange'

import './index.sass'

function CreateJourney() {

    let route
    let dates
    let [description, setDescription] = useState('')

    function handleDates(date1, date2){
        dates=[date1, date2]
    }

    function handleRoute(coordenates){
        route=coordenates
    }

    function handleOnSubmit(){
        logic.generateJourney(route, dates, description)
    }

    return (<main className="journey">
        <h3 className='text-center'>Design your journey</h3>
        <div className='journey__map'>
            <MapRoute getRoute={handleRoute}/>
        </div>

        <h3 className='text-center'>Sailing days</h3>
        <div className='journey__calendar'>
            <DateRange getDates={handleDates}/>
        </div>

        <h3 className='text-center'>Description</h3>
        <div className='journey__description'>
            <textarea onChange={e=>setDescription(e.target.value)}></textarea>
        </div>

        <button onClick={handleOnSubmit}>Submit</button>
    </main>)
}

export default withRouter(CreateJourney)
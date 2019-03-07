'use strict'

import React, { useState, useEffect } from 'react'
import { Route, withRouter, Link } from 'react-router-dom'

import MapDisplay from '../MapDisplay'


function JourneyInfo(props) {

    const { journey } = props

    return (<main className="journey">

        <h3 className='text-center'>Journey Route</h3>
        <div className='journey__map'>
            <MapDisplay routes={[journey.route]} sea={journey.sea} />
        </div>

        <h3 className='text-center'>Sailing days</h3>
        <p>{journey.dates[0]} - {journey.dates[1]}</p>

        <h3 className='text-center'>Description</h3>
        <p>{journey.description}</p>

        <button onClick={ ()=>props.history.push('/home')}>go Back</button>
    </main>)
}

export default withRouter(JourneyInfo)
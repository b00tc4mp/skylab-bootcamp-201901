'use strict'

import React, { Component } from 'react'
import { Route, withRouter, Link } from 'react-router-dom'
import Nav from '../Nav'
import MapRoute from '../MapRoute'
import DateRange from '../DateRange'

import './index.sass'

function CreateJourney() {

    return (<main className="journey">
        <h3 className='text-center'>Design your journey</h3>
        <div className='journey__map'>
            <MapRoute />
        </div>
        {/* <div className="wrapper"></div> */}
        <h3 className='text-center'>Sailing days</h3>
        <div className='journey__calendar'>
            <DateRange />
        </div>
    </main>)
}

export default withRouter(CreateJourney)
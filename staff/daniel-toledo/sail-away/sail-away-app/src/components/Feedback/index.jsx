'use strict'

import React, { useState, useEffect } from 'react'
import { Route, withRouter, Link } from 'react-router-dom'
import { data } from 'sail-away-data'

import './index.sass'


function Feedback({message}) {


    return (<main className="feedback">

        <div className='feedback__container'>
           <p>{message}</p>
        </div>
    </main>)
}

export default withRouter(Feedback)
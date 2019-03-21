'use strict'

import React, { useState, useEffect } from 'react'
import { Route, withRouter, Link } from 'react-router-dom'

import './index.sass'

function Experience({ getExperience, initialExperience }) {

    let [experience, setExperience] = useState(initialExperience)

    function handleExperience(event) {
        setExperience(event.target.value)
        getExperience(event.target.value)
    }

    return (<main className="experienceRange">
        <input onChange={handleExperience} className='experienceRange__input' type="range" min="0" max='10000' value={experience}/>
    </main>)
}

export default withRouter(Experience)
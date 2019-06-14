'use strict'

import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'

import Feedback from '../Feedback'

import logic from '../../logic'
import './index.sass'

function Nav(props) {

    const [user, setUser] = useState(null)
    const [feedback, setfeedback] = useState('')

    useEffect(()=>{
       getUser()

    },[])

    async function getUser() {
        try {
            let user =await logic.retrieveUserLogged()
            setUser(user)

        } catch (error) {
            setfeedback(error.message)
        }
    }


    return (!!user && 
        <section className='welcome'>
        <div className='welcome__container'>
            <h2 className='welcome__title'>Ahoy {user.name}!</h2>
            <p className='welcome__text'>Tell us more about yourself, so we can find your best match</p>
            <button className='welcome__button' onClick={() => props.history.push('/edit-profile')}>Let's sail away</button>
        </div>
        {feedback ? <Feedback message={feedback} /> : <div />}
    </section>
    )
}

export default withRouter(Nav)
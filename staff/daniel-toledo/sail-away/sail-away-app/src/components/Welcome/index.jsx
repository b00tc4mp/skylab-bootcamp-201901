'use strict'

import React, { useState, useEffect } from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'

import logic from '../../logic'

import './index.sass'

function Nav(props) {

    let [user, setUser] = useState(null)

    useEffect(()=>{
       getUser()
    },[])

    async function getUser() {
        try {
            let user =await logic.retrieveUserLogged()
            setUser(user)

        } catch (error) {
            console.error(error)
        }
    }


    return (user && 
        <section className='welcome'>
        <div className='welcome__container'>
            <h2 className='welcome__title'>Ahoy {user.name}!</h2>
            <p className='welcome__text'>Tell us more about you, so we can find you the best match</p>
            <button className='welcome__button' onClick={() => props.history.push('/edit-profile')}>Let's sail away</button>
        </div>
    </section>
    )
}

export default withRouter(Nav)
'use strict'

import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'

import Feedback from '../Feedback'

import './index.sass'
import logic from '../../logic';

function Menu(props) {

    const [feedback, setfeedback] = useState('')

    async function handleMyProfile() {
        try {
            const { id } = await logic.retrieveUserLogged()
            props.history.push(`/user/${id}`)

        } catch (error) {
            setfeedback(error.message)
        }
    }

    function handleLoggOut() {
        logic.logOutUser()
        props.isLogged(false)
        props.history.push(`/`)
    }

    return (
        <section className="menu">
            <button onClick={handleMyProfile}>My Profile</button>
            <button onClick={() => props.history.push(`/edit-profile`)}>Edit Profile</button>
            <button onClick={() => props.history.push(`/my-journeys`)}>My Journeys</button>
            <button onClick={() => props.history.push(`/create-journey`)}>Create Journey</button>
            <button onClick={() => props.history.push(`/favorites/`)}>Favorites</button>
            <button onClick={handleLoggOut}>Log out</button>
            {feedback ? <Feedback message={feedback} /> : <div />}
        </section>)
}

export default withRouter(Menu)
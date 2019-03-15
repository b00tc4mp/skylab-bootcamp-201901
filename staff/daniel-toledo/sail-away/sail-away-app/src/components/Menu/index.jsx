'use strict'

import React, { useState, useEffect } from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'

import './index.sass'
import logic from '../../logic';

function Menu(props) {

    async function handleMyProfile() {
        try {
            let { id } = await logic.retrieveUserLogged()
            props.history.push(`/user/${id}`)

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <section className="menu">
            <button onClick={handleMyProfile}>My Profile</button>
            <button onClick={() => props.history.push(`/edit-profile`)}>Edit Profile</button>
            <button onClick={() => props.history.push(`/my-journeys`)}>My Journeys</button>
            <button onClick={() => props.history.push(`/create-journey/userId`)}>Create Journey</button>
            <button onClick={() => props.history.push(`/favorites/`)}>Favorites</button>
        </section>)
}

export default withRouter(Menu)
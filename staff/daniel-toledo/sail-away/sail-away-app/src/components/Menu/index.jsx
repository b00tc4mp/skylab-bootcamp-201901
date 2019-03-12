'use strict'

import React, { useState, useEffect } from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'

import './index.sass'

function Menu(props) {

    return (
        <section className="menu">
            <button onClick={()=>props.history.push(`/profile/userId`)}>My Profile</button>
            <button onClick={()=>props.history.push(`/edit-profile/userId`)}>Edit Profile</button>
            <button onClick={()=>props.history.push(`/journyes/userId`)}>My Journeys</button>
            <button onClick={()=>props.history.push(`/create-journey/userId`)}>Create Journey</button>
            <button onClick={()=>props.history.push(`/favorites/userId`)}>Favorites</button>
        </section>)
}

export default withRouter(Menu)
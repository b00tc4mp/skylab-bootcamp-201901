import React, { Fragment, useState } from 'react'
import './index.sass'
import { withRouter, Route, Redirect } from 'react-router-dom'
import EventsNav from '../EventsNav'
import NavBar from '../NavBar'

export default function EventsNearMe() {
    return (
        <Fragment>
            <NavBar/>
            <EventsNav/>
        <p>Near me</p>
        </Fragment>
    )
}
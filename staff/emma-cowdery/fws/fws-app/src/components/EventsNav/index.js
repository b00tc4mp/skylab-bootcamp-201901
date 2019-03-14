import React, { Fragment, useState } from 'react'
import './index.sass'
import { withRouter, Route, Redirect } from 'react-router-dom'

export default withRouter(function EventsNav(props) {
    const handleGoToCategories = () => {
        props.history.push('/event-categories')
    }

    const handleGoToNearMe = () => {
        props.history.push('/events-nearme')
    }

    const handleGoToMap = () => {
        props.history.push('/events-map')
    }

    return (
        <Fragment>
            <div className='events-nav'>
                {props.history.location.pathname === '/event-categories' ? <button className='events-nav__element events-nav__element-selected'>CATEGORIES</button> : <button onClick={e => {e.preventDefault(); props.history.push('/event-categories')}} className='events-nav__element'>CATEGORIES</button>}
                {props.history.location.pathname === '/events-nearme' ? <button className='events-nav__element events-nav__element-selected'>NEAR ME</button> : <button onClick={e => {e.preventDefault(); props.history.push('/events-nearme')}} className='events-nav__element'>NEAR ME</button>}
                {props.history.location.pathname === '/events-map' ? <button className='events-nav__element events-nav__element-selected'>MAP</button> : <button onClick={e => {e.preventDefault(); props.history.push('/events-map')}} className='events-nav__element'>MAP</button>}
            </div>
        </Fragment>
    )
})
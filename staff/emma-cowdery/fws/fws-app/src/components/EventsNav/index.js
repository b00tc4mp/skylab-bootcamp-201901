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
            <div>
                <div>
                    <button onClick={handleGoToCategories}>Categories</button>
                </div>
                <div>
                    <button onClick={handleGoToNearMe}>Near me</button>
                </div>
                <div>
                    <button onClick={handleGoToMap}>Map</button>
                </div>
            </div>
        </Fragment>
    )
})
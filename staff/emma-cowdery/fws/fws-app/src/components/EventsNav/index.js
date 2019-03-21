import React, { Fragment } from 'react'
import './index.sass'
import { withRouter } from 'react-router-dom'
import stringContainsAny from '../NavBar/string-contains-any'

export default withRouter(function EventsNav(props) {

    return (
        <Fragment>
            <div className='events-nav'>
                {stringContainsAny(props.history.location.pathname, '/event-categories', '/category') ? <button className='events-nav__element events-nav__element-selected'>CATEGORIES</button> : <button onClick={e => {e.preventDefault(); props.history.push('/event-categories')}} className='events-nav__element'>CATEGORIES</button>}
                {props.history.location.pathname === '/events-nearme' ? <button className='events-nav__element events-nav__element-selected'>NEAR ME</button> : <button onClick={e => {e.preventDefault(); props.history.push('/events-nearme')}} className='events-nav__element'>NEAR ME</button>}
                {props.history.location.pathname === '/events-map' ? <button className='events-nav__element events-nav__element-selected'>MAP</button> : <button onClick={e => {e.preventDefault(); props.history.push('/events-map')}} className='events-nav__element'>MAP</button>}
            </div>
        </Fragment>
    )
})
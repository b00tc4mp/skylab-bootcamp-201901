import React, { useState, useEffect } from 'react'
import Search from '../Search'
import './index.sass'
import logic from '../../logic'
import { withRouter } from 'react-router-dom'
import stringContainsAny from './string-contains-any'
import Feedback from '../Feedback'

export default withRouter(function Navbar(props) {
    const [search, setSearch] = useState('no-search')
    const [searchButton, setSearchButton] = useState('search-button')
    const [logo, setLogo] = useState('logo')
    const [userButton, setUserButton] = useState('user-button')
    const [arrow, setArrow] = useState('arrow')
    const [eventsButton, setEventsButton] = useState('events-button')
    const [showUserButton, setShowUserButton] = useState(true)
    const [image, setImage] = useState()
    const [feedback, setFeedback] = useState()
    const [level, setLevel] = useState()
    const [type, setType] = useState()

    const { history: { location: { pathname } } } = props

    useEffect(() => {
        if (window.innerWidth > 1200) {
            setShowUserButton(false)
        }

        try {
            logic.retrieveUser()
            .then(({user}) => {
                if(user.profilePicture) setImage({backgroundImage: `url(${user.profilePicture})`})
                else setImage({backgroundImage: `url(images/default-user.png)`})
            })
            .catch(err => {
                setFeedback(err.message)
                setLevel('warning')
                setType('banner')
            })
        } catch ({message}) {
            setFeedback(message)
            setLevel('warning')
            setType('banner')
        }
    }, [])

    return (
        <header className="nav-bar">
            <div onClick={e => {e.preventDefault(); props.history.push('/event-categories')}} className={`nav-bar__${logo}`}></div>
            <div className='nav-bar__right'>
                {stringContainsAny(pathname, '/restaurant-results/search/') && !showUserButton && <div className='nav-bar__right-desksearch'><Search setQuery={props.setQuery} setSubmit={props.setSubmit} query={props.query} /></div>}
                {stringContainsAny(pathname,'/restaurant-results/search/') && <button onClick={e => { e.preventDefault(); props.history.push('/event-categories') }} className={`nav-bar__${eventsButton}`}>events</button>}
                {stringContainsAny(pathname,'/event-categories', '/events-nearme', '/events-map') && <button onClick={e => { e.preventDefault(); props.history.push('/restaurant-results/search/near me') }} className={`nav-bar__${eventsButton}`}>+ new event</button>}
                {!stringContainsAny(pathname, '/event-categories', '/events-nearme', '/events-map', '/restaurant-results/search/') && <div className='nav-bar__two-buttons'><button onClick={e => { e.preventDefault(); props.history.push('/event-categories') }} className={`nav-bar__${eventsButton}`}>events</button><button onClick={e => { e.preventDefault(); props.history.push('/restaurant-results/search/near me') }} className={`nav-bar__${eventsButton}`}>+ new event</button></div>}
                {stringContainsAny(pathname, '/restaurant-results/search/') && showUserButton && <i className={`fas fa-search nav-bar__${searchButton}`} onClick={e => { e.preventDefault(); setSearch('search'); setSearchButton('no-search-button'); setLogo('no-logo'); setUserButton('no-user-button'); setEventsButton('no-events-button'); setArrow('no-arrow') }}></i>}
                {showUserButton ? <div className='nav-bar__user' onClick={e => { e.preventDefault(); props.setShowRightBar(true) }}><div style={ image } className={`nav-bar__${userButton}`}></div><i className={`fas fa-chevron-down nav-bar__${arrow}`}/></div> : <div className='nav-bar__user' onClick={e => { e.preventDefault(); props.setShowDropdown(true) }}><div style={ image } className={`nav-bar__user-button`}></div><i class="fas fa-chevron-down nav-bar__arrow"/></div>}
            </div>
            <div className={`nav-bar__${search}`}>{<Search setQuery={props.setQuery} setSearch={setSearch} setSearchButton={setSearchButton} setLogo={setLogo} setUserButton={setUserButton} setArrow={setArrow} setEventsButton={setEventsButton}></Search>}</div>
            {feedback && <Feedback feedback={feedback} level={level} type={type} setFeedback={setFeedback}/>}
        </header>
    )
})
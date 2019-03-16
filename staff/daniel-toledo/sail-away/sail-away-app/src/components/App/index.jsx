'use strict'

import React, { useState } from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'
import Home from '../Home'
import Register from '../Register'
import ProfileEdit from '../ProfileEdit'
import ProfileInfo from '../ProfileInfo'
import Users from '../Users'
import Login from '../Login'
import JourneyCreate from '../JourneyCreate'
import JourneyInfo from '../JourneyInfo'
import JourneyEdit from '../JourneyEdit'
import MyJourneys from '../MyJourneys'
import Nav from '../Nav'
import Menu from '../Menu'
import Landing from '../Landing'
import Favorites from '../Favorites' 

import './index.sass'
import logic from '../../logic';

function App(props) {

    let [journeys, setJourneys] = useState([])
    let [journey, setJourney] = useState(null)
    let [menu, setMenu] = useState('close')

    async function handleSearch(seaId) {
       
        try {
            let response = await logic.searchBySea(seaId)
            setJourneys(response)

            props.history.push('/home')

        } catch (err) {
            console.error(err)
        }
    }

    async function handleMoreInfo(id) {

        try {
            const journey = await logic.retrieveJourney(id)
            setJourney(journey)
            props.history.push(`/journey/${id}`)

        } catch (error) {
            console.error(error)
        }
    }

    function handleEditJourney(id) {

        props.history.push(`/edit-journey/${id}`)

    }

    function handleToggleMenu(open) {
        setMenu(open ? 'open' : 'close')
    }

    return (<main className="app">
        <Nav toggleMenu={handleToggleMenu} isLanding={window.location.hash === '#/'}/>
        <div className='menuApp'>
            <div className={`menu__${menu} ml-auto`}>
                <Menu />
            </div>
        </div>
        <Route exact path='/' render={() => <Landing search={handleSearch} />} />
        <Route path="/register" render={() => <Register />} />
        <Route path="/edit-profile" render={() => <ProfileEdit initialUser={{}} />} />
        <Route path='/user/:id' render={()=> <ProfileInfo />}/>
        <Route path='/users/' render={()=> <Users />} />
        <Route path="/login" render={() => <Login />} />
        <Route path="/home" render={() => journeys.length ? <Home journeys={journeys} moreInfo={handleMoreInfo} editJourney={handleEditJourney} /> : <Redirect to="/" />} />
        <Route path="/create-journey" render={() => <JourneyCreate />} />
        <Route path="/edit-journey/:id" render={() => <JourneyEdit journey={journey} />} />
        <Route path="/my-journeys" render={() => <MyJourneys />} />
        <Route path="/journey/:id" render={() => <JourneyInfo />} />
        <Route path="/favorites" render={() => <Favorites />} />
    </main>)
}

export default withRouter(App)
'use strict'

import React, { useState, useEffect } from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'

import Home from '../Home'
import Register from '../Register'
import Welcome from '../Welcome'
import ProfileEdit from '../ProfileEdit'
import ProfileInfo from '../ProfileInfo'
import Users from '../Users'
import Login from '../Login'
import JourneyCreate from '../JourneyCreate'
import JourneyInfo from '../JourneyInfo'
import MyJourneys from '../MyJourneys'
import Nav from '../Nav'
import Menu from '../Menu'
import Landing from '../Landing'
import Favorites from '../Favorites'
import NoResult from '../NoResult'

import './index.sass'
import logic from '../../logic';

function App(props) {

    let [logged, setLogged] = useState(logic.isUserLoggedIn)
    let [menu, setMenu] = useState('close')

    useEffect(()=>{
        props.history.listen(() => handleToggleMenu(false));
    },[menu])

    function handleToggleMenu(isOpen) {
        setMenu(isOpen ? 'open' : 'close')
    }

    return (<main className="app">
        <Nav toggleMenu={handleToggleMenu} isOpen={menu} isLogged={logged} />
        <div className='menuApp'>
            <div className={`menu__${menu} ml-auto`}>
                <Menu isLogged={()=>setLogged(false)}/>
            </div>
        </div>
        <Route exact path='/' render={() => <Landing  />} />
        <Route path="/register" render={() => <Register isLogged={()=>setLogged(true)}/>} />
        <Route path="/welcome" render={() => <Welcome />} />
        <Route path="/edit-profile" render={() => logic.isUserLoggedIn ? <ProfileEdit initialUser={{}} /> : <Login isNeeded={true} />} />
        <Route path='/user/:id' render={() => <ProfileInfo />} />
        <Route path='/users/' render={() => <Users />} />
        <Route path="/login" render={() => <Login isLogged={()=>setLogged(true)}/>} />
        <Route path="/home/:seaId" render={() => <Home />} />
        <Route path="/no-result" render={() => <NoResult />} />
        <Route path="/create-journey" render={() => logic.isUserLoggedIn ? <JourneyCreate /> : <Login isNeeded={true} />} />
        <Route path="/edit-journey/:id" render={() => logic.isUserLoggedIn ? <JourneyCreate isEdit={true} /> : <Login isNeeded={true} />} />
        <Route path="/my-journeys" render={() => logic.isUserLoggedIn ? <MyJourneys /> : <Login isNeeded={true} />} />
        <Route path="/journey/:id" render={() => <JourneyInfo />} />
        <Route path="/favorites" render={() => logic.isUserLoggedIn ? <Favorites /> : <Login isNeeded={true} />} />
    </main>)
}

export default withRouter(App)
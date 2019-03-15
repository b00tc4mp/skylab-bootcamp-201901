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

    function handleGoHome() {

        props.history.push('/')
    }

    async function handleSearch(seaId) {
       
        try {
            let response = await logic.searchBySea(seaId)
            setJourneys(response)

            props.history.push('/home')

        } catch (err) {
            console.error(err)
        }
    }

    function handleGoJourney() {
        props.history.push('/create-journey')
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

    const initialUser = {
        name: '',
        surname: '',
        pictures: ['https://i.pinimg.com/originals/f8/e9/14/f8e914cdb8329c2956255a24858e1086.jpg', 'https://coronadotimes.com/wp-content/uploads/2017/01/Popeye.Flex_.jpg'],
        gender: '',
        nationality: '',
        birthday: null,
        description: '',
        boats: [{
            id:'boat-1',
            pictures: ['https://capuchar.files.wordpress.com/2015/03/barco-la-perla-negra44.jpg','https://cde.peru.com//ima/0/0/8/4/1/841340/611x458/lima.jpg'],
            name: 'practice boat',
            type: 'velero',
            model: '90-60-90',
            boatLength: 'XLL',
            crew: 'big-party',
            age: 10,
            description: 'the best boat'
        }],
        talents: [],
        experience: 0,
        sailingTitles: [],
        languages: []
    }

    return (<main className="app">
        <Nav toggleMenu={handleToggleMenu} />
        <div className='menuApp'>
            <div className={`menu__${menu} ml-auto`}>
                <Menu />
            </div>
        </div>
        <Route exact path='/' render={() => <Landing search={handleSearch} />} />
        <Route path="/register" render={() => <Register />} />
        <Route path="/edit-profile" render={() => <ProfileEdit initialUser={initialUser} />} />
        <Route path='/user/:id' render={()=> <ProfileInfo />} />
        <Route path='/users/' render={()=> <Users />} />
        <Route path="/login" render={() => <Login />} />
        <Route path="/home" render={() => journeys.length ? <Home journeys={journeys} moreInfo={handleMoreInfo} editJourney={handleEditJourney} /> : <Redirect to="/" />} />
        <Route path="/create-journey" render={() => <JourneyCreate />} />
        <Route path="/edit-journey/:id" render={() => <JourneyEdit journey={journey} />} />
        <Route path="/my-journeys" render={() => <MyJourneys />} />
        <Route path="/journey/:id" render={() => <JourneyInfo />} />
        <Route path="/favorites" render={() => <Favorites />} />
        <button onClick={handleGoHome}>go Home</button>
        <button onClick={handleGoJourney}>create Journey</button>
    </main>)
}

export default withRouter(App)
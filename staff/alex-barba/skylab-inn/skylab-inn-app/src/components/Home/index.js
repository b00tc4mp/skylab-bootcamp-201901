'use strict'

import React, { Fragment } from 'react'
import { Route, withRouter } from 'react-router-dom'
import Welcome from '../Welcome'
import Search from '../Search'
import AdvancedSearch from '../AdvancedSearch'
import Profile from '../Profile'

import logic from '../../logic'

function Home({ history }) {

    const handleToSearch = () => {
        history.push('/home/search')
    }

    const handleToAdvancedSearch = () => {
        history.push('/home/adsearch')
    }

    const handleToProfile = () => {
        history.push('/home/profile')
    }

    const handleToWelcome = () => {
        history.push('/home')
    }

    const handleToSignOut = () => {
        logic.signOutUser()
        history.push('/')
    }

    const handleSearch = query => {
        console.log(query)
    }

    const handleAdvancedSearch = query => {
        console.log(query)
    }


    return (
        <Fragment>
            <Route exact path="/home" render={() => <Welcome onToSearch={handleToSearch} onToAdvancedSearch={handleToAdvancedSearch} onToWelcome={handleToWelcome} onToProfile={handleToProfile} onToSignOut={handleToSignOut} />} />
            <Route path="/home/search" render={() => <Search onSearch={handleSearch} onToWelcome={handleToWelcome} onToProfile={handleToProfile} onToSignOut={handleToSignOut} />} />
            <Route path="/home/adsearch" render={() => <AdvancedSearch onAdvancedSearch={handleAdvancedSearch} onToWelcome={handleToWelcome} onToProfile={handleToProfile} onToSignOut={handleToSignOut} />} />
            <Route path="/home/profile" render={() => <Profile onToWelcome={handleToWelcome} onToProfile={handleToProfile} onToSignOut={handleToSignOut} />} />
        </Fragment>
    )
}

export default withRouter(Home)
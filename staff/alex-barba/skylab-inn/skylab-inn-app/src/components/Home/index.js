'use strict'

import React, { Fragment, useContext } from 'react'
import { Route, withRouter } from 'react-router-dom'
import Welcome from '../Welcome'
import Search from '../Search'
import AdvancedSearch from '../AdvancedSearch'
import Profile from '../Profile'

import logic from '../../logic'
import { AppContext } from '../AppContext';

function Home({ history }) {

    const { setFeedback, setSearchResults } = useContext(AppContext)

    const handleSearch = query => {
        try {
            logic.searchSkylaber(query)
                .then(searchResults => {
                    setFeedback(null)
                    setSearchResults(searchResults) 
                })
                .catch(({ message }) => setFeedback(message))
            } catch ({ message }) {
                setFeedback(message)
        }
    }

    const handleAdvancedSearch = query => {
        console.log(query)
    }


    const handleToSearch = () => {
        setFeedback(null)
        history.push('/home/search')
    }

    const handleToAdvancedSearch = () => {
        setFeedback(null)
        history.push('/home/adsearch')
    }

    const handleToProfile = () => {
        setFeedback(null)
        history.push('/home/profile')
    }

    const handleToWelcome = () => {
        setFeedback(null)
        history.push('/home')
    }

    const handleToSignOut = () => {
        setFeedback(null)
        logic.signOutUser()
        history.push('/')
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
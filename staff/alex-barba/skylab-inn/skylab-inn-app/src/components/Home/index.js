'use strict'

import React, { Fragment, useContext } from 'react'
import { Route, withRouter } from 'react-router-dom'
import Welcome from '../Welcome'
import Search from '../Search'
import AdvancedSearch from '../AdvancedSearch'
import Profile from '../Profile'
import Skylaber from '../Skylaber'

import logic from '../../logic'
import { AppContext } from '../AppContext';

function Home({ history }) {

    const { setFeedback, setSearchResults, setSkylaber, setAdSearchResults } = useContext(AppContext)

    const handleSearch = query => {
        try {
            logic.searchSkylaber(query)
                .then(searchResults => {
                    setFeedback(null)
                    return setSearchResults(searchResults) 
                })
                .catch(({ message }) => setFeedback(message))
            } catch ({ message }) {
                setFeedback(message)
        }
    }

    const handleSkylaber = id => {
        try {
            logic.retrieveSkylaber(id)
                .then(skylaber => {
                    setFeedback(null)
                    setSkylaber(skylaber)
                    return history.push(`/home/search/${id}`)
                })
                .catch(({ message }) => setFeedback(message))
            } catch ({ message }) {
                setFeedback(message)
        }
    }

    const handleAdvancedSearch = param => {
        debugger
        try {
            logic.adSearchSkylaber(param)
                .then(searchResults => {
                    setFeedback(null)
                    return setAdSearchResults(searchResults) 
                })
                .catch(({ message }) => setFeedback(message))
            } catch ({ message }) {
                setFeedback(message)
        }
    }
   

    const handleToSearch = () => {
        setFeedback(null)
        history.push('/home/search')
    }

    const handleToAdvancedSearch = () => {
        setFeedback(null)
        history.push('/home/adsearch')
    }

    const handleToBack = () => {
        history.goBack()
    }

    const handleToProfile = () => {
        setSearchResults(null)
        setAdSearchResults(null)
        setFeedback(null)
        history.push('/home/profile')
    }

    const handleToWelcome = () => {
        setSearchResults(null)
        setAdSearchResults(null)
        setFeedback(null)
        history.push('/home')
    }
    
    const handleToSignOut = () => {
        setSearchResults(null)
        setAdSearchResults(null)
        setFeedback(null)
        logic.signOutUser()
        history.push('/')
    }
  


    return (
        <Fragment>
            <Route exact path="/home" render={() => <Welcome onToSearch={handleToSearch} onToAdvancedSearch={handleToAdvancedSearch} onToWelcome={handleToWelcome} onToProfile={handleToProfile} onToSignOut={handleToSignOut} />} />
            <Route exact path="/home/search" render={() => <Search onSearch={handleSearch} onSkylaber={handleSkylaber} onToWelcome={handleToWelcome} onToProfile={handleToProfile} onToSignOut={handleToSignOut} />} />
            <Route path="/home/adsearch" render={() => <AdvancedSearch onAdvancedSearch={handleAdvancedSearch} onSkylaber={handleSkylaber} onToWelcome={handleToWelcome} onToProfile={handleToProfile} onToSignOut={handleToSignOut} />} />
            <Route path="/home/profile" render={() => <Profile onToWelcome={handleToWelcome} onToProfile={handleToProfile} onToSignOut={handleToSignOut} />} />
            <Route path="/home/search/:skylaberId" render={props => <Skylaber skylaberId={props.match.params.skylaberId}  onToBack={handleToBack} onToWelcome={handleToWelcome} onToProfile={handleToProfile} onToSignOut={handleToSignOut} />} />
        </Fragment>
    )
}

export default withRouter(Home)
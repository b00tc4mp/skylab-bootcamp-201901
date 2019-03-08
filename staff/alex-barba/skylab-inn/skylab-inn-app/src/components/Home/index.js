'use strict'

import React, { Fragment, useContext } from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'
import Welcome from '../Welcome'
import Search from '../Search'
import AdvancedSearch from '../AdvancedSearch'
import Profile from '../Profile'
import Skylaber from '../Skylaber'
import AddSkylaber from '../AddSkylaber'
import NavFooter from '../NavFooter'

import logic from '../../logic'
import { AppContext } from '../AppContext';

function Home({ history }) {

    const { setFeedback, setSearchResults, setSkylaber, setAdSearchResults, setUserData, userData } = useContext(AppContext)

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

    const handleSkylaber = id => {
        try {
            logic.retrieveSkylaber(id)
                .then(skylaber => {
                    setFeedback(null)
                    setSkylaber(skylaber)
                    history.push(`/home/search/${id}`)
                })
                .catch(({ message }) => setFeedback(message))
        } catch ({ message }) {
            setFeedback(message)
        }
    }

    const handleAdvancedSearch = param => {
        try {
            logic.adSearchSkylaber(param)
                .then(searchResults => {
                    setFeedback(null)
                    setAdSearchResults(searchResults)
                })
                .catch(({ message }) => setFeedback(message))
        } catch ({ message }) {
            setFeedback(message)
        }
    }

    const handleUpdatePersonalInfo = data => {
        try {
            logic.updateUser(data)
                .then(() => logic.retrieveUser())
                .then(user => setUserData(user))
                .catch(({ message }) => setFeedback(message))
        } catch ({ message }) {
            setFeedback(message)
        }
    }

    const handleAddInformation = (type, data) => {
        try {
            logic.addUserInformation(type, data)
                .then(() => logic.retrieveUser())
                .then(user => setUserData(user))
                .catch(({ message }) => setFeedback(message))
        } catch ({ message }) {
            setFeedback(message)
        }
    }

    const handleUpdateInformation = (id, type, data) => {
        try {
            logic.updateUserInformation(id, type, data)
                .then(() => logic.retrieveUser())
                .then(user => setUserData(user))
                .catch(({ message }) => setFeedback(message))
        } catch ({ message }) {
            setFeedback(message)
        }
    }

    const handleRemoveInformation = (id, type) => {
        try {
            logic.removeUserInformation(id, type)
                .then(() => logic.retrieveUser())
                .then(user => setUserData(user))
                .catch(({ message }) => setFeedback(message))
        } catch ({ message }) {
            setFeedback(message)
        }
    }

    const handleOnAddSkylaber = data => {
        try {
            logic.addSkylaber(data)
                .then(() => setFeedback('Skylaber added to the whitelist!'))
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

    const handleToAddSkylaber = () => {
        setFeedback(null)
        history.push('/home/add-skylaber')
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
            <Route exact path="/home" render={() => <Welcome onToSearch={handleToSearch} onToAdvancedSearch={handleToAdvancedSearch} onToAddSkylaber={handleToAddSkylaber} />} />
            <Route exact path="/home/search" render={() => <Search onSearch={handleSearch} onSkylaber={handleSkylaber}/>} />
            <Route path="/home/adsearch" render={() => <AdvancedSearch onAdvancedSearch={handleAdvancedSearch} onSkylaber={handleSkylaber}/>} />
            <Route path="/home/profile" render={() => userData.role === 'User' ? <Profile onUpdatePersonalInfo={handleUpdatePersonalInfo} onAddInformation={handleAddInformation} onUpdateInformation={handleUpdateInformation} onRemoveInformation={handleRemoveInformation}/> : <Redirect to="/home" />} />
            <Route path="/home/add-skylaber" render={() => userData.role === 'Admin' ? <AddSkylaber onToBack={handleToBack}onSubmit={handleOnAddSkylaber} /> : <Redirect to="/home" />} />
            <Route path="/home/search/:skylaberId" render={props => <Skylaber skylaberId={props.match.params.skylaberId} onToBack={handleToBack}/>} />
            <Route path ="/home" render={() => <NavFooter onToWelcome={handleToWelcome} onToProfile={handleToProfile} onToSignOut={handleToSignOut}/>}/>
        </Fragment>
    )
}

export default withRouter(Home)
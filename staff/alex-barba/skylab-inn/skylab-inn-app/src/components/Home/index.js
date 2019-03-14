'use strict'

import React, { Fragment, useContext, useState } from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'
import Welcome from '../Welcome'
import Search from '../Search'
import AdvancedSearch from '../AdvancedSearch'
import Profile from '../Profile'
import Skylaber from '../Skylaber'
import ManagaSkylabers from '../ManagaSkylabers'
import NavFooter from '../NavFooter'

import logic from '../../logic'
import { AppContext } from '../AppContext'

function Home({ history }) {

    const { setFeedback, setSearchResults, setAdSearchResults, setUserData, userData, setWhiteList, setUnverifiedEmails, setSearch, setQuery, showModal, setShowModal, modalMessage, setModalMessage } = useContext(AppContext)

    const [hashedUrl, setHashedUrl] = useState('')
    const [addToClipboard, setAddToClipboard] = useState(null)
    const [skylaber, setSkylaber] = useState(null)

    const handleSearch = query => {
        try {
            logic.searchSkylaber(query)
                .then(searchResults => {
                    setFeedback(null)
                    setSearchResults(searchResults)
                })
                .catch(({ message }) => {
                    setFeedback(message)
                    setSearchResults([])
                })
        } catch ({ message }) {
            setFeedback(message)
            setSearchResults([])
        }
    }

    const handleSkylaber = id => {
        debugger
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
                .catch(({ message }) => {
                    setFeedback(message)
                    setAdSearchResults([])
                })
        } catch ({ message }) {
            setFeedback(message)
            setAdSearchResults([])
        }
    }

    const handleOnShareResults = skylaberIds => {
        try {
            logic.shareResults(skylaberIds)
                .then(url => setHashedUrl(url))
                .then(() => setAddToClipboard())
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
                .then(() => {
                    setShowModal(true)
                    setModalMessage('Information successfully updated')
                })
                .catch(({message}) => {
                    switch(true){
                        case message.includes(' email_1 dup key'): setFeedback('Failed to update. Email is already registered'); break;
                    }
                })
        } catch ({ message }) {
            setFeedback(message)
        }
    }

    const handleOnUploadPhoto = data =>{
        try {
            logic.updateUserPhoto(data)
                .then(user => setUserData(user))
                .then(() => {
                    setShowModal(true)
                    setModalMessage('Photo successfully! uploaded')
                })
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
                .then(() => {
                    setShowModal(true)
                    setModalMessage('Information successfully added')
                })
                .catch(({ message }) => {
                    switch(true){
                        case message.includes('.startDate'): setFeedback('Failed to update. Start date is required'); break;
                    }
                    setFeedback(message)
                })
        } catch ({ message }) {
            setFeedback(message)
        }
    }

    const handleUpdateInformation = (id, type, data) => {
        try {
            logic.updateUserInformation(id, type, data)
                .then(() => logic.retrieveUser())
                .then(user => setUserData(user))
                .then(() => {
                    setShowModal(true)
                    setModalMessage('Information successfully updated')
                })
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
                .then(() => {
                    setShowModal(true)
                    setModalMessage('Information successfully removed')
                })
                .catch(({ message }) => setFeedback(message))
        } catch ({ message }) {
            setFeedback(message)
        }
    }

    const handleOnAddSkylaber = data => {
        try {
            logic.addSkylaber(data)
                .then(() => {
                    setShowModal(true)
                    setModalMessage('Skylaber added to the Whitelist!')
                })
                .then(() => logic.retrievePendingSkylabers())
                .then(preUsers => setWhiteList(preUsers))
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

    const handleToManageSkylabers = () => {
        logic.retrievePendingSkylabers()
            .then(preUsers => setWhiteList(preUsers))
            .then(() => logic.retrieveUnverifiedEmails())
            .then(unverified => setUnverifiedEmails(unverified))
            setFeedback(null)
            history.push('/home/manage-skylabers')
    }

    const handleToBack = () => {
        history.goBack()
    }

    const handleToProfile = () => {
        setSearchResults(null)
        setAdSearchResults(null)
        setFeedback(null)
        setSearch(null)
        setQuery(null)
        history.push('/home/profile')
    }

    const handleToWelcome = () => {
        setSearchResults(null)
        setAdSearchResults(null)
        setFeedback(null)
        setSearch(null)
        setQuery(null)
        history.push('/home')
    }

    const handleToSignOut = () => {
        setSearchResults(null)
        setAdSearchResults(null)
        setFeedback(null)
        setSearch(null)
        setQuery(null)
        logic.signOutUser()
        history.push('/')
    }

    return (
        <Fragment>
            <Route exact path="/home" render={() => <Welcome onToSearch={handleToSearch} onToAdvancedSearch={handleToAdvancedSearch} onToManageSkylabers={handleToManageSkylabers} />} />
            <Route exact path="/home/search" render={() => <Search onSearch={handleSearch} onSkylaber={handleSkylaber}/>} />
            <Route path="/home/adsearch" render={() => <AdvancedSearch addToClipboard={addToClipboard}  hashedUrl={hashedUrl} onShareResults={handleOnShareResults} onAdvancedSearch={handleAdvancedSearch} onSkylaber={handleSkylaber}/>} />
            <Route path="/home/profile" render={() => userData.role === 'User' ? <Profile onUploadPhoto={handleOnUploadPhoto} onUpdatePersonalInfo={handleUpdatePersonalInfo} onAddInformation={handleAddInformation} onUpdateInformation={handleUpdateInformation} onRemoveInformation={handleRemoveInformation}/> : <Redirect to="/home" />} />
            <Route path="/home/manage-skylabers" render={() => userData.role === 'Admin' ? <ManagaSkylabers onToBack={handleToBack} onSubmit={handleOnAddSkylaber} /> : <Redirect to="/home" />} />
            <Route path="/home/search/:skylaberId" render={props => <Skylaber skylaberId={props.match.params.skylaberId} skylaber={skylaber}  retrieveSkylaber={handleSkylaber} onToBack={handleToBack}/>} />
            <Route path ="/home" render={() => <NavFooter onToWelcome={handleToWelcome} onToProfile={handleToProfile} onToSignOut={handleToSignOut}/>}/>
        </Fragment>
    )
}

export default withRouter(Home)
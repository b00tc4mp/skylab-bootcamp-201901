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

    const { setShowSpinner, setFeedback, setSearchResults, setAdSearchResults, setUserData, userData, setWhiteList, setUnverifiedEmails, setSearch, setQuery, setShowModal, setModalMessage, setModalType } = useContext(AppContext)

    const [hashedUrl, setHashedUrl] = useState('')
    const [addToClipboard, setAddToClipboard] = useState(null)
    const [skylaber, setSkylaber] = useState(null)

    const handleSearch = query => {
        setShowSpinner(true)
        try {
            logic.searchSkylaber(query)
                .then(searchResults => {
                    setShowSpinner(null)
                    setFeedback(null)
                    setSearchResults(searchResults)
                })
                .catch(({ message }) => {
                    setShowSpinner(null)
                    setFeedback(message)
                    setSearchResults(null)
                })
        } catch ({ message }) {
            setShowSpinner(null)
            setFeedback(message)
            setSearchResults(null)
        }
    }

    const handleSkylaber = id => {
        setShowSpinner(true)
        try {
            logic.retrieveSkylaber(id)
                .then(skylaber => {
                    setShowSpinner(null)
                    setFeedback(null)
                    setSkylaber(skylaber)
                    history.push(`/home/search/${id}`)
                })
                .catch(({ message }) => {
                    setShowSpinner(null)
                    setFeedback(message)
                })
        } catch ({ message }) {
            setShowSpinner(null)
            setFeedback(message)
        }
    }

    const handleAdvancedSearch = filter => {
        setShowSpinner(true)
        try {
            logic.adSearchSkylaber(filter)
                .then(searchResults => {
                    setShowSpinner(null)
                    setFeedback(null)
                    setAdSearchResults(searchResults)
                })
                .catch(({ message }) => {
                    setShowSpinner(null)
                    setFeedback(message)
                    setAdSearchResults([])
                })
        } catch ({ message }) {
            setShowSpinner(null)
            setFeedback(message)
            setAdSearchResults([])
        }
    }

    const handleOnShareResults = skylaberIds => {
        setShowSpinner(true)
        try {
            logic.shareResults(skylaberIds)
                .then(url => setHashedUrl(url))
                .then(() => setAddToClipboard(true))
                .then(() => {
                    setShowSpinner(null)
                    setShowModal(true)
                    setModalType('success')
                    setModalMessage('Public URL added to clipboard')
                    setAddToClipboard(null)
                })
                .catch(({ message }) => {
                    setShowSpinner(null)
                    setFeedback(message)
                })
        } catch ({ message }) {
            setShowSpinner(null)
            setFeedback(message)
        }
    }

    const handleUpdateContactInfo = data => {
        setShowSpinner(true)
        try {
            logic.updateUser(data)
                .then(() => logic.retrieveUser())
                .then(user => setUserData(user))
                .then(() => {
                    setShowSpinner(null)
                    setShowModal(true)
                    setModalType('success')
                    setModalMessage('Information successfully updated')
                })
                .catch(({ message }) => {
                    setShowSpinner(null)
                    switch (true) {
                        case message.includes('email_1 dup key'):  
                            setShowModal(true)
                            setModalType('error')
                            setModalMessage('Failed to update. Email is already registered')
                        break;
                        default: 
                            setShowModal(true)
                            setModalType('error')
                            setModalMessage(message)
                        break;
                    }
                })
        } catch ({ message }) {
            setShowSpinner(null)
            setShowModal(true)
            setModalType('error')
            setModalMessage(message)
        }
    }

    const handleOnUploadPhoto = image => {
        setShowSpinner(true)
        try {
            logic.updateUserPhoto(image)
                .then(user => setUserData(user))
                .then(() => {
                    setShowSpinner(null)
                    setShowModal(true)
                    setModalType('success')
                    setModalMessage('Photo successfully! uploaded')
                })
                .catch(({ message }) => {
                    setShowSpinner(null)
                    setShowModal(true)
                    setModalType('error')
                    setModalMessage(message)
                })
        } catch ({ message }) {
            setShowSpinner(null)
            setShowModal(true)
            setModalType('error')
            setModalMessage(message)
        }
    }

    const handleAddInformation = (type, data) => {
        setShowSpinner(true)
        try {
            logic.addUserInformation(type, data)
                .then(() => logic.retrieveUser())
                .then(user => setUserData(user))
                .then(() => {
                    setShowSpinner(null)
                    setShowModal(true)
                    setModalType('success')
                    setModalMessage('Information successfully added')
                })
                .catch(({ message }) => {
                    setShowSpinner(null)
                    switch (true) {
                        case message.includes('.startDate'):
                            setShowModal(true)
                            setModalType('error') 
                            setModalMessage('Failed to update. Start date is required')
                        break;
                        default: 
                            setShowModal(true)
                            setModalType('error')
                            setModalMessage(message)
                        break;
                    }
                })
        } catch ({ message }) {
            setShowSpinner(null)
            setShowModal(true)
            setModalType('error')
            setModalMessage(message)
        }
    }

    const handleUpdateInformation = (id, type, data) => {
        setShowSpinner(true)
        try {
            logic.updateUserInformation(id, type, data)
                .then(() => logic.retrieveUser())
                .then(user => setUserData(user))
                .then(() => {
                    setShowSpinner(null)
                    setShowModal(true)
                    setModalType('success')
                    setModalMessage('Information successfully updated')
                })
                .catch(({ message }) => {
                    setShowSpinner(null)
                    setShowModal(true)
                    setModalType('error')
                    setModalMessage(message)
                })
        } catch ({ message }) {
            setShowSpinner(null)
            setShowModal(true)
            setModalType('error')
            setModalMessage(message)
        }
    }

    const handleRemoveInformation = (id, type) => {
        setShowSpinner(true)
        try {
            logic.removeUserInformation(id, type)
                .then(() => logic.retrieveUser())
                .then(user => setUserData(user))
                .then(() => {
                    setShowSpinner(null)
                    setShowModal(true)
                    setModalType('success')
                    setModalMessage('Information successfully removed')
                })
                .catch(({ message }) => {
                    setShowSpinner(null)
                    setShowModal(true)
                    setModalType('error')
                    setModalMessage(message)
                })
        } catch ({ message }) {
            setShowSpinner(null)
            setShowModal(true)
            setModalType('error')
            setModalMessage(message)
        }
    }

    const handleOnAddSkylaber = data => {
        setShowSpinner(true)
        try {
            logic.addSkylaber(data)
                .then(() => {
                    setShowSpinner(null)
                    setShowModal(true)
                    setModalType('success')
                    setModalMessage('Skylaber added to the Whitelist!')
                })
                .then(() => logic.retrievePendingSkylabers())
                .then(preUsers => setWhiteList(preUsers))
                .catch(({ message }) => {
                    setShowSpinner(null)
                    switch (true) {
                        case message.includes('is not a valid email'):
                            setShowModal(true)
                            setModalType('error') 
                            setModalMessage('Failed to add. Email is not valid')
                        break;
                        default: 
                            setShowModal(true)
                            setModalType('error')
                            setModalMessage(message)
                        break;
                    }
                })
        } catch ({ message }) {
            setShowSpinner(null)
            setShowModal(true)
            setModalType('error')
            setModalMessage(message)
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
            <Route exact path="/home/search" render={() => <Search onSearch={handleSearch} onSkylaber={handleSkylaber} />} />
            <Route path="/home/adsearch" render={() => <AdvancedSearch addToClipboard={addToClipboard} hashedUrl={hashedUrl} onShareResults={handleOnShareResults} onAdvancedSearch={handleAdvancedSearch} onSkylaber={handleSkylaber} />} />
            <Route path="/home/profile" render={() => userData.role === 'User' ? <Profile onUploadPhoto={handleOnUploadPhoto} onUpdateContactInfo={handleUpdateContactInfo} onAddInformation={handleAddInformation} onUpdateInformation={handleUpdateInformation} onRemoveInformation={handleRemoveInformation} /> : <Redirect to="/home" />} />
            <Route path="/home/manage-skylabers" render={() => userData.role === 'Admin' ? <ManagaSkylabers onSubmit={handleOnAddSkylaber} /> : <Redirect to="/home" />} />
            <Route path="/home/search/:skylaberId" render={props => <Skylaber skylaberId={props.match.params.skylaberId} skylaber={skylaber} retrieveSkylaber={handleSkylaber} onToBack={handleToBack} />} />
            <Route path="/home" render={() => <NavFooter onToWelcome={handleToWelcome} onToProfile={handleToProfile} onToSignOut={handleToSignOut} />} />
        </Fragment>
    )
}

export default withRouter(Home)
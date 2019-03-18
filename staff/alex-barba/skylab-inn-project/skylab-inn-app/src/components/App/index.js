import React, { useState, useEffect, Fragment } from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'
import { AppContext } from '../AppContext'
import LogIn from '../LogIn'
import SignUp from '../SignUp'
import Home from '../Home'
import SharedSkylabers from '../SharedSkylabers'
import Modal from '../Modal'
import Spinner from '../Spinner'

import logic from '../../logic'

function App({ history }) {

    const [feedback, setFeedback] = useState(null)
    const [userData, setUserData] = useState({})
    const [query, setQuery] = useState(null)
    const [searchResults, setSearchResults] = useState(null)
    const [adSearchResults, setAdSearchResults] = useState([])
    const [whiteList, setWhiteList] = useState(null)
    const [unverifiedEmails, setUnverifiedEmails] = useState(null)
    const [skylabersShared, setSkylabersShared] = useState(null)
    const [search, setSearch] = useState([])
    const [showModal, setShowModal] = useState(null)
    const [modalMessage, setModalMessage] = useState(null)
    const [modalType, setModalType] = useState(null)
    const [showSpinner, setShowSpinner] = useState(null)
    const [showConfirmAlert, setShowConfirmAlert] = useState(null)

    useEffect(() => {
        logic.isUserLoggedIn && logic.retrieveUser()
            .then(user => setUserData(user))
    }, [userData.name])

    const handleSignUp = (name, surname, email, password, passwordConfirmation) => {
        setShowSpinner(true)
        try {
            logic.registerUser(name, surname, email, password, passwordConfirmation)
                .then(() => {
                    setShowSpinner(null)
                    setFeedback(null)
                    setShowModal(true)
                    setModalType('success')
                    setModalMessage('You have been successfully registered!')
                    history.push('/')
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

    const handleLogIn = (email, password) => {
        setShowSpinner(true)
        try {
            logic.logInUser(email, password)
                .then(() => logic.retrieveUser())
                .then(user => setUserData(user))
                .then(() => {
                    setShowSpinner(null)
                    setFeedback(null)
                })
                .then(() => history.push('/home'))
                .catch(({ message }) => {
                    setShowSpinner(null)
                    setFeedback(message)
                })
        } catch ({ message }) {
            setShowSpinner(null)
            setFeedback(message)
        }
    }

    const handleRetrieveEncryptedIds = ids => {
        setShowSpinner(true)
        try {
            logic.retrieveEncryptedIds(ids)
                .then(skylabersShared => setSkylabersShared(skylabersShared))
                .then(() => {
                    setShowSpinner(null)
                    setFeedback(null)
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

    const handleToLogIn = () => {
        setFeedback(null)
        history.push('/')
    }

    const handleToSignUp = () => {
        setFeedback(null)
        history.push('/signup')
    }

    return (
        <Fragment>
            <AppContext.Provider value={{ feedback, setFeedback, userData, setUserData, query, setQuery, searchResults, setSearchResults, adSearchResults, setAdSearchResults, whiteList, setWhiteList, unverifiedEmails, setUnverifiedEmails, search, setSearch, showModal, setShowModal, modalMessage, setModalMessage, modalType, setModalType, showSpinner, setShowSpinner, showConfirmAlert, setShowConfirmAlert }}>
                <Route exact path='/' render={() => !logic.isUserLoggedIn ? <LogIn onLogIn={handleLogIn} onToSignUp={handleToSignUp} /> : <Redirect to='/home' />} />
                <Route path='/signup' render={() => !logic.isUserLoggedIn ? <SignUp onSignUp={handleSignUp} onToLogIn={handleToLogIn} /> : <Redirect to='/home' />} />
                <Route path='/home' render={() => logic.isUserLoggedIn ? <Home /> : <Redirect to='/' />} />
                <Modal />
                <Spinner />
            </AppContext.Provider>
            <Route path='/skylabers/:encryptedIds' render={(props) => <SharedSkylabers encryptedIds={props.match.params.encryptedIds} retrieveEncryptedIds={handleRetrieveEncryptedIds} skylabersShared={skylabersShared} />} />
        </Fragment>
    )

}

export default withRouter(App)
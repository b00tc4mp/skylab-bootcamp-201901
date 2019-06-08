import React, { Fragment, useState } from 'react'
import { Route, withRouter } from 'react-router-dom'

import { GlobalContext } from './components/GlobalContext'

import appLogic from './logic'

// import GoogleMaps from './components/Maps'
import Feedback from './components/Feedback'
import Spinner from './components/Spinner'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'

import './App.scss'

function App ({ history }) {

    const [ feedback, setFeedback ] = useState(null)
    const [ showSpinner, handleSpinner ] = useState(null)

    const handleRegister = (name, email, password) => {
        handleSpinner(true)

        try {
            appLogic.registerUser(name, email, password)
                .then(() => {
                    handleSpinner(null)
                    history.push('/')
                })
        } catch ({ message }) {
            handleSpinner(null)
            setFeedback(message)
        }
    }

    const handleLogin = (email, password) => {
        handleSpinner(true)

        try{
            appLogic.loginUser(email, password)
                .then(() => {
                    handleSpinner(null)
                    history.push('/home')
                })
        } catch ({ message }) {
            showSpinner(null)
            setFeedback(message)
        }
    }

//     const locate = () => {
//         try{
//             debugger
//             appLogic.handleInitialLocation()
//                 .then((res) => console.log(res) )
//         } catch (error) {
//             debugger

//         }
//     }

//    useEffect(() => {
//     locate()
//    },[])



    return (
        <Fragment>
            <GlobalContext.Provider value={{ feedback, setFeedback, showSpinner, handleSpinner }}>
                <Route exact path='/' component={Landing} />
                <Route exact path='/login' render={() => <Login onLogin={handleLogin} />} />
                <Route exact path='/register' render={() => <Register onRegister={handleRegister} />} />
                <Route exact path='/home' render={() => <Home />} />
                <Spinner />
            </GlobalContext.Provider>
            {feedback && <Feedback />}
            {/* <section className="maps">
                <GoogleMaps />
    </section>*/}
        </Fragment>
    )
}

export default withRouter(App)

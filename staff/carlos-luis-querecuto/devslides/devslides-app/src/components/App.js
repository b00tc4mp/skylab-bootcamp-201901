import React, { useState } from 'react'
import { Route, withRouter, Redirect, Switch } from 'react-router-dom'
import Landing from '../components/Landing'
import Register from '../components/Register'
import Login from '../components/Login'
import Navbar from '../components/Navbar'
import Home from '../components/Home'
import Editor from '../components/Editor'

import { Message } from './Contexts'

import logic from '../logic'

import 'bulma/bulma.sass'


function App({history}) {
    
    const [message, setMessage] = useState(null)

    const handleRegister = async (name, surname, username, email, password) => {
        try {
            const res = await logic.registerUser(name, surname, username, email, password)
            setMessage(null)
            history.push('/register')
        }
        catch (error) {
            setMessage({ message: error.message, type: 'Error' })
        }
    }

    const handleLogin = async (email, password) => {
        try {
            await logic.authenticateUser(email, password)
            setMessage(null)
            history.push('/Personal/Presentations')
        }
        catch (error) {
            console.log(error)
            setMessage({ message: error.message, type: 'Error' })
        }
    }

    return (<>
        <Navbar/>
        <Switch>

            <Route exact path="/" render={() => logic.isUserLoggedIn ? <Redirect to="/Personal/Presentations" /> : <Landing />} />
            <Route exact path="/Editor/:id" render={() => logic.isUserLoggedIn ?  <Editor /> : <Redirect to="/login" /> } />
            <Route path="/Personal" render={() => logic.isUserLoggedIn ?  <Home /> : <Redirect to="/" />} />
            <Message.Provider value={{ message, setMessage }}>
                <Route path="/register" render={() => {
                    return <Register onRegister={handleRegister} />
                }} />
                <Route path="/login" render={() => {
                    return <Login onLogin={handleLogin} />
                }} />
            </Message.Provider>
        </Switch>
    </>)

}


export default withRouter(App)
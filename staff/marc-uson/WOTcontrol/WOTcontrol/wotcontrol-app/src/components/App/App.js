import React, { useState } from "react"
import { Route, withRouter, Redirect, Switch } from 'react-router-dom'
import { Context } from "../Context"
import logic from '../../logic'
import Landing from '../Landing'
import Login from '../Login'
import Register from '../Register'
import Home from '../Home'
import './App.sass'

function App(props) {
    const [isLogedIn, setIsLogedIn] = useState('')
    const [error, setError] = useState('')
    const [user, setUser] = useState('')
    const [devices, setDevices] = useState([])


    const handleRegisterNavigation = () => props.history.push('/register')

    const handleLoginNavigation = () => props.history.push('/login')

    const handleRegister = async (name, surname, email, password) => {
        try {
            await logic.registerUser(name, surname, email, password)
            setError(null)
            props.history.push('/login')
        } catch (error) {
            setError(error.message)
        }
    }

    const handleLogin = async (email, password) => {
        try {
            await logic.loginUser(email, password)
            setError(null)
            const _user = await logic.registerUser()
            setUser({name: _user.name, surname: _user.surname, email: _user.email})
            console.log(user)
            props.history.push('/home')
        } catch (error) {
            setError(error.message)
        }
    }

    const handleLogout = () => {
        logic.logoutUser()
        setUser(null)
        setDevices(null)
        setError(null)
        props.history.push('/')
    }

    const handleUserUpdate = async (data) => {
        try {
            await logic.updateUser(data)
            const _user  = await logic.retrieveUser()
            console.log(_user)
        } catch (error) {
            setError('error')
        }
    }

    const handleDeviceAdd = async (deviceName, deviceIp, devicePort, timeInterval) => {
        console.log('llega')
        const _devicePort = Number(devicePort)
        const _timeInterval = Number(timeInterval)
        try {
            const response = await logic.addDevice(deviceName, deviceIp, _devicePort, _timeInterval)
            console.log(response)
            const _device  = await logic.retrieveDevice(deviceName)
            setDevices(devices.push(_device))
            console.log(devices)
        } catch (error) {
            //setError(error)
            console.log(error)
        }
    }

    return (
        <Context.Provider value={{ isLogedIn, setIsLogedIn, error, setError}}>
            <Switch>
                <Route exact path="/" render={() => logic.isUserLoggedIn ? <Redirect to="/home" /> : <Landing onRegister={handleRegisterNavigation} onLogin={handleLoginNavigation} />} />
                <Route path="/register" render={() => logic.isUserLoggedIn ? <Redirect to="/home" /> : <Register onRegister={handleRegister} navigateToLogin={handleLoginNavigation} />} />
                <Route path="/login" render={() => logic.isUserLoggedIn ? <Redirect to="/home" /> : <Login onLogin={handleLogin} navigateToRegister={handleRegisterNavigation}/>} />
                <Route path="/home" render={() => logic.isUserLoggedIn ? <Home onLogout={handleLogout} onUserUpdate={handleUserUpdate} onDeviceAdd={handleDeviceAdd} user={user} /> : <Redirect to ="/" /> }/>

                <Redirect to="/" />
            </Switch>
        </Context.Provider >
    )
}

export default withRouter(App)
import React, { useState, useEffect } from "react"
import { Route, withRouter, Redirect, Switch } from 'react-router-dom'
import logic from '../../logic'
import Landing from '../Landing'
import Login from '../Login'
import Register from '../Register'
import Home from '../Home'
import './index.css'
import Uikit from 'uikit/dist/js/uikit.min.js'


function App(props) {
    const [user, setUser] = useState(null)
    const [devices, setDevices] = useState([])
    const [device, setDevice]= useState(null)
    const [deviceStatus, setDeviceStatus]= useState(null)
    const [analogVal, setAnalogVal] = useState([])
    const [Digital1Val, setDigital1Val] = useState([])
    const [Digital2Val, setDigital2Val] = useState([])
    const[interval, setInterval] = useState(null)

    useEffect(() => {
        const [, main, device] = props.location.pathname.split('/')
        if (main === "home") {
            if(device)handleRetrieveDevice(device)
            handleUpdate()
        }
    },)

    const handleUpdate = async () => {
        let devicesArr = []
        try {
            const _user = await logic.retrieveUser()
            setUser(_user)
            if (_user.devices) _user.devices.forEach(device => devicesArr.push(device.name))
        setDevices(devicesArr)
        } catch (error) {
            Uikit.notification({ message: error.message, status: 'danger' })
        }
    }

    const handleRegisterNavigation = () => props.history.push('/register')

    const handleLoginNavigation = () => props.history.push('/login')

    const handleRegister = async (name, surname, email, password) => {
        try {
            await logic.registerUser(name, surname, email, password)
            props.history.push('/login')
        } catch (error) {
            Uikit.notification({ message: error.message, status: 'danger' })
        }
    }

    const handleLogin = async (email, password) => {
        try {
            await logic.loginUser(email, password)
            handleUpdate()
            props.history.push('/home')
        } catch (error) {
            Uikit.notification({ message: error.message, status: 'danger' })
        }
    }

    const handleLogout = () => {
        logic.logoutUser()
        setUser(null)
        setDevices(null)
        setDevice(null)
        setDeviceStatus(null)
        props.history.push('/')
    }

    const handleUserUpdate = async (data) => {
        try {
            await logic.updateUser(data)
            Uikit.notification({ message: 'user succesfully updated', status: 'succes' })
            handleUpdate()
        } catch (error) {
            Uikit.notification({ message: error.message, status: 'danger' })
        }
    }

    const handleUserDelete = async (data) => {
        try {
            await logic.deleteUser(user.name)
            Uikit.notification({ message: 'user succesfully deleted', status: 'succes' })
            handleLogout()
        } catch (error) {
            Uikit.notification({ message: error.message, status: 'danger' })
        }
    }

    const handleDeviceAdd = async (deviceName, deviceIp, devicePort, timeInterval) => {
        const _devicePort = Number(devicePort)
        const _timeInterval = Number(timeInterval)
        try {
            await logic.checkDevice(deviceIp, _devicePort)
            await logic.addDevice(deviceName, deviceIp, _devicePort, _timeInterval)
            Uikit.notification({ message: `Device ${deviceName} added`, status: 'succes' })
            setInterval(_timeInterval)
            handleUpdate()
        } catch (error) {
            Uikit.notification({ message: error.message, status: 'danger' })
        }
    }

    const handleDeviceDelete = async (deviceName) =>{
        try {
            await logic.deleteDevice(deviceName)
            handleUpdate()
            setDevice(null)
            setDeviceStatus(null)
            props.history.push('/home')
            Uikit.notification({ message: `Device ${deviceName} succesfully deleted`, status: 'succes' })
        } catch (error) {
            Uikit.notification({ message: error.message, status: 'danger' })
        }
    }

    const handleRetrieveDevice = async (deviceName) => {

        props.history.push(`/home/${deviceName}`)
        try {
            const device = await logic.retrieveDevice(deviceName)
            const response = await logic.checkDevice(device.ip, device.port )
            setDevice(device)
            setDeviceStatus(response.status)
            const _interval = Number(response.interval)
            setInterval(_interval)
        } catch (error) {
            Uikit.notification({ message: error.message, status: 'danger' })
        }
    }

    const handleRefreshDevice = async (name) => {
        try {
            await logic.renameDevice(name, name)
            await logic.changeDeviceTime(name, interval)
            await handleRetrieveDevice(name)
            Uikit.notification({ message: `Device ${name} succesfully refreshed`, status: 'succes' })
        } catch (error) {
            Uikit.notification.closeAll()
            Uikit.notification({ message: error.message, status: 'danger' })
            setDeviceStatus('OFF')
            setInterval(20000)
        }
    }

    const handleToggleDout= async(name, pin) => {
        try {
            await logic.toggleDigitalOutput(name, pin)
            handleUpdate()
        } catch (error) {
            Uikit.notification({ message: error.message, status: 'danger' })
        }
    }

    const handleSetMotor= async(name, pin, speed) => {
        const _pin = Number(pin)
        const _speed = Number(speed)
        try {
            await logic.setMotor(name, _pin, _speed)
            handleUpdate()
        } catch (error) {
            Uikit.notification({ message: error.message, status: 'danger' })
        }
    }

    const handleSetServo= async(name, pin, angle) => {
        const _pin= Number(pin)
        const _angle = Number(angle)
        try {
            await logic.setServo(name, _pin, _angle)

            handleUpdate()
        } catch (error) {
            Uikit.notification({ message: error.message, status: 'danger' })
        }
    }

    const handleRetrieveInputs = async () => {
        try {
            await logic.checkDevice(device.ip, device.port)
            const analogInput = await logic.retrieveAnalog(device.name)
            const digitalInput1 = await logic.retrieveDigital(device.name, 1)
            const digitalInput2 = await logic.retrieveDigital(device.name, 2)
            const value1 = digitalInput1[digitalInput1.length -1]
            const value2 = digitalInput2[digitalInput2.length -1]
            setAnalogVal(analogInput)
            setDigital1Val(value1)
            setDigital2Val(value2)
        } catch (error) {
            Uikit.notification.closeAll()
            Uikit.notification({ message: error.message, status: 'danger' })
            setDeviceStatus('OFF')
            setInterval(20000)
        }
    }

    return (
        <Switch>
            <Route exact path="/" render={() =>
                logic.isUserLoggedIn ?
                    <Redirect to="/home" />
                    : <Landing
                        onRegister={handleRegisterNavigation}
                        onLogin={handleLoginNavigation}
                    />}
            />
            <Route path="/register" render={() =>
                logic.isUserLoggedIn ?
                    <Redirect to="/home" />
                    : <Register
                        onRegister={handleRegister}
                        navigateToLogin={handleLoginNavigation}
                    />}
            />
            <Route path="/login" render={() =>
                logic.isUserLoggedIn ?
                    <Redirect to="/home" />
                    : <Login
                        onLogin={handleLogin}
                        navigateToRegister={handleRegisterNavigation}
                    />}
            />
            <Route path="/home" render={() =>
                logic.isUserLoggedIn ?
                    <Home
                        user={user}
                        onUserUpdate={handleUserUpdate}
                        onUserDelete={handleUserDelete}
                        onLogout={handleLogout}
                        timeInterval={interval}
                        device={device}
                        deviceStatus={deviceStatus}
                        deviceList={devices}
                        retrieveInputs={handleRetrieveInputs}
                        onDeviceAdd={handleDeviceAdd}
                        onDeviceDelete={handleDeviceDelete}
                        onDeviceSelect={handleRetrieveDevice}
                        onDeviceRefresh={handleRefreshDevice}
                        onDoutChange={handleToggleDout}
                        onMotorChange={handleSetMotor}
                        onServoChange={handleSetServo}
                        analogData={analogVal}
                        din1Data={Digital1Val}
                        din2Data={Digital2Val}
                    />
                    : <Redirect to="/" />}
            />

            <Redirect to="/" />
        </Switch>
    )
}

export default withRouter(App)
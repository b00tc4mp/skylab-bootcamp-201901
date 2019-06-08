import React from 'react'
import Navbar from '../Navbar'
import Device from '../Device'
import './index.sass'

function Home({
    user,
    device,
    deviceStatus,
    timeInterval,
    retrieveInputs,
    onLogout,
    onUserUpdate,
    onDeviceAdd,
    onDeviceDelete,
    deviceList,
    onDeviceSelect,
    onDoutChange,
    onMotorChange,
    onServoChange
}) {

    return <main >
        <Navbar
            onLogout={onLogout}
            onUserUpdate={onUserUpdate}
            user={user}
            onDeviceAdd={onDeviceAdd}
            deviceList={deviceList}
            onDeviceSelect={onDeviceSelect}
        />
        {device && <Device
            device={device}
            deviceStatus={deviceStatus}
            onDeviceDelete={onDeviceDelete}
            timeInterval={timeInterval}
            retrieveInputs={retrieveInputs}
            onDoutChange={onDoutChange}
            onMotorChange={onMotorChange}
            onServoChange={onServoChange}
        />}
        {!device && <h1 className='uk-position-center'>Please, select any device</h1>}
    </main>
}

export default Home
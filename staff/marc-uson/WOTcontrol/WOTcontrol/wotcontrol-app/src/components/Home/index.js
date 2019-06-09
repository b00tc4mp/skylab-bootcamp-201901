import React from 'react'
import Navbar from '../Navbar'
import Device from '../Device'
import './index.sass'

function Home({
    user,
    device,
    deviceStatus,
    timeInterval,
    analogData,
    din1Data,
    din2Data,
    retrieveInputs,
    onLogout,
    onUserUpdate,
    onDeviceAdd,
    onDeviceDelete,
    deviceList,
    onDeviceSelect,
    onDoutChange,
    onMotorChange,
    onServoChange,
    onDeviceRefresh
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
            onDeviceRefresh={onDeviceRefresh}
            timeInterval={timeInterval}
            retrieveInputs={retrieveInputs}
            onDoutChange={onDoutChange}
            onMotorChange={onMotorChange}
            onServoChange={onServoChange}
            analogData={analogData}
            din1Data={din1Data}
            din2Data={din2Data}
        />}
        {!device && <h1 className='uk-position-center'>Please, select any device</h1>}
    </main>
}

export default Home
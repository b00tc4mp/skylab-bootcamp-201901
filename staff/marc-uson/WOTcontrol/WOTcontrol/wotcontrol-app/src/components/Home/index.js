import React from 'react'
import Navbar from '../Navbar'
import Device from '../Device'
import './index.css'

function Home({
    onLogout,
    device,
    deviceStatus,
    timeInterval,
    analogData,
    din1Data,
    din2Data,
    retrieveInputs,
    onUserUpdate,
    onUserDelete,
    onDeviceAdd,
    onDeviceDelete,
    deviceList,
    onDeviceSelect,
    onDoutChange,
    onMotorChange,
    onServoChange,
    onDeviceRefresh
}) {

    return <div>
        <Navbar
            onLogout={onLogout}
            device={device}
            deviceStatus={deviceStatus}
            deviceList={deviceList}
            onDeviceAdd={onDeviceAdd}
            onDeviceSelect={onDeviceSelect}
            onDeviceDelete={onDeviceDelete}
            onUserUpdate={onUserUpdate}
            onUserDelete={onUserDelete}
            onDeviceRefresh={onDeviceRefresh}
        />
        {device && <Device
            device={device}
            deviceStatus={deviceStatus}
            timeInterval={timeInterval}
            retrieveInputs={retrieveInputs}
            onDoutChange={onDoutChange}
            onMotorChange={onMotorChange}
            onServoChange={onServoChange}
            analogData={analogData}
            din1Data={din1Data}
            din2Data={din2Data}
        />}
        {!device && <h1 className='home-text uk-position-center'>Please, select or add a device</h1>}
    </div>
}

export default Home
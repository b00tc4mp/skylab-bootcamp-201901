import React from 'react'

function DeviceList({onDeviceSelect, deviceList}){

    return <>
        {
            deviceList.map(name =>{
                return <li key={name} onClick={() => onDeviceSelect(name)}>{name}</li>
            })
        }
    </>
}

export default DeviceList
import React, { useState, useEffect } from 'react'
import QRCode from 'qrcode'
import './index.sass'
import Button from '../Button'

function QrCode({ callback, qr, setLoader, handleRestartDate }) {

    callback()
    setLoader(false)
    return (
        <div className='g-QrCode' >
            {qr && <img src={qr} />}
            <a href={qr} download>Download QR</a>
            <Button anotherOrder={true} primary={true} click={handleRestartDate} />
        </div>
    )
}

export default QrCode
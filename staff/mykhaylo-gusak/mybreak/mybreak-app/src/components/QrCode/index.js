import React, { useState, useEffect } from 'react'
import QRCode from 'qrcode'
import './index.sass'

function QrCode({ callback, qr }) {

    callback()

    return (
        <div className='g-QrCode' >
            {qr && <img src={qr} />}
            <a href={qr} download>Download QR</a>
        </div>
    )
}

export default QrCode
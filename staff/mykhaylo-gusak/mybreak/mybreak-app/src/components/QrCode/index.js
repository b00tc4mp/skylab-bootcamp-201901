import React, { useState, useEffect } from 'react'
import QRCode from 'qrcode'



function QrCode({ text }) {

    const [qr, setQr] = useState(false)

    var opts = {
        errorCorrectionLevel: 'Q',
        type: 'image/jpeg',
        rendererOpts: {
            quality: 10
        }
    }

    useEffect(() => {
        return (async () => {
            try {
                return setQr(await QRCode.toDataURL('www.mipagina.com/{deded}', opts))
            } catch (err) {
                alert(err)
            }
        })()
    }, [])

    return (
        <>
            {qr && <img src={qr} />}
            <a href={qr} download>Download QR</a>
        </>
    )
}

export default QrCode
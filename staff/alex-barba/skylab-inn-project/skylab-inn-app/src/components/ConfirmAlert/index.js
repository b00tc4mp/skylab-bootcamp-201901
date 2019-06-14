import React, { useContext } from 'react'
import { AppContext } from '../AppContext'

import './index.sass'

export default function ConfirmAlert({ onAlertAnswer }) {

    const { showConfirmAlert, setShowConfirmAlert } = useContext(AppContext)

    const visible = showConfirmAlert ? `alert display-block  ` : 'alert display-none'


    const handleOnAlertAnswer = reply => {
        setShowConfirmAlert(null)
        onAlertAnswer(reply, showConfirmAlert[1], showConfirmAlert[2])
    }

    return (
        <div className={visible}>
            <div className='alert__content'>
                <p>Are you sure you want to remove this information?</p>
                <div className='alert__content-buttons'>
                    <button className='btn btn--primary' onClick={e => { e.preventDefault(); handleOnAlertAnswer('No') }}>No</button>
                    <button className='btn btn--danger' type='submit' onClick={e => { e.preventDefault(); handleOnAlertAnswer('Yes') }}>Yes please!</button>
                </div>
            </div>
        </div>
    )
}
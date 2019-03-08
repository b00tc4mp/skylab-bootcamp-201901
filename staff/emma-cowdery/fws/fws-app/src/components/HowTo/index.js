import React, { Fragment } from 'react'
import './index.sass'
import logic from '../../logic'

export default function HowTo ({setShowHowTo}) {
    function handleDontShowHowTo() {
        logic.dontShowHowTo()
            .then(res => setShowHowTo(res.howTo))
    }

    return (
        <Fragment>
            <button onClick={e => {e.preventDefault(); setShowHowTo(false)}}>x</button>
            <p>How to info</p>
            <button onClick={e => {e.preventDefault(); handleDontShowHowTo()}}>don't show again</button>
        </Fragment>
    )
}
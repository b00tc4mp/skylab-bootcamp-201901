import React from 'react'
import literals from './literals'


function CheckoutCartInfo({ lang, info, onOk }) {
    const { deleted, ordered } = literals[lang]

    let message
    if (info === 'deleted') message = deleted 
    else message = ordered

    return <div>
        <h2>{message}</h2>
        <button onClick={e => { e.stopPropagation()
                                onOk() }}> Ok </button>
    </div>
}

export default CheckoutCartInfo
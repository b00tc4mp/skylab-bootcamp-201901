import React from 'react'
import literals from './literals'

function Name({ lang, name }) {
    const { hello } = literals['en-US'] //cambiar por lang
    
    return <h1 className="salute text-white">{hello} {name}!</h1>
}

export default Name
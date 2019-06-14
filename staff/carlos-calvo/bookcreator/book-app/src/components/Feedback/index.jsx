'use strict'

import React from 'react'
import './index.sass'

function Feedback({ message, level }) {
    return <section className={`feedback ${level ? `feedback--${level}` : ''}`}>{message}</section>
}

export default Feedback

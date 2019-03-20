'use strict'

import React from 'react'
import './index.sass'

function Feedback({message}) {
    return <section className="feedback">{message}</section>
}

export default Feedback
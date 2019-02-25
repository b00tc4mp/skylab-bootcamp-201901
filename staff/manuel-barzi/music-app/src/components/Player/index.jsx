'use strict'

import React from 'react'
import './index.sass'

function Player({ track: { url, title } }) {
    return <section className="player">
        <h5>{title}</h5>
        <audio src={url} controls />
    </section>
}

export default Player
import React from 'react'
import './index.sass'

function Player({ url }) {

    return <section className="footer">
        <audio src={url} controls autoPlay/>
    </section>
}

export default Player

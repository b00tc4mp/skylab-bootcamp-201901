import React from 'react'

function Player({ url }) {

    return <section>
        <audio src={url} controls autoPlay/>
    </section>
}

export default Player

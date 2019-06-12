import React from 'react'
import Results from '../Results'

function Artists({ onArtists }) {

    return (

        <section className="artists">

            <h1>Yours - Artists</h1>  
            <Results onResults={onArtists} />

        </section>
    )
}

export default Artists
import React from 'react'
import Results from '../Results'

function Favorites({ onFavorites }) {

    return (
        <section className="favorites">

            <h1>Favorites</h1>
            
            <Results onResults={onFavorites} />

        </section>
    )
}

export default Favorites
import React from 'react'
import Results from '../Results'

function Favorites({ onFavorites, onRefreshFav }) {

    return (
        <section className="favorites">

            <h1>Favorites</h1>
            
            <Results onResults={onFavorites} onRefreshFav={onRefreshFav}/>

        </section>
    )
}

export default Favorites
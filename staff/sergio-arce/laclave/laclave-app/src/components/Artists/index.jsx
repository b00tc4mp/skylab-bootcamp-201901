import React from 'react'

function Artists({ onArtists }) {

    return (

        <section className="artists">

            <h1>Yours - Artists</h1>  

            <section className="artists__grid">

            {!onArtists.length ?
                    <p>You have no favorites yet</p> :
                    onArtists.map( fav => 
                            <div className="artists__grid__item">
                                <h3>{fav.name}</h3>
                                <h3>Age: {2019 - fav.year}</h3>
                                <img src={fav.image} alt={fav.name} /> 
                            </div>                           
                    )
            }
            </section>

        </section>
    )
}

export default Artists
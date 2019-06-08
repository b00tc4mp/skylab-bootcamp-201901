import React from 'react'

function Congresses({ onCongresses }) {

    return (

        <section className="congresses">

            <h1>Your Congresses</h1>

            {

                !onCongresses.length ?

                    <p>You have no favorites yet</p> :

                    onCongresses.map( fav=> 

                        <section>
                              <h3>{fav.name}</h3>
                              <h4>{fav.category}</h4>
                              <h4>{fav.country}</h4>
                              <h4>{fav.year}</h4>
                              <img src={fav.image} alt={fav.name} /> 
                        </section>
                        
                    )
            }
        </section>
    )
}

export default Congresses
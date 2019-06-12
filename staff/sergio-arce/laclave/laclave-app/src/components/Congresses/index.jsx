import React from 'react'
import Results from '../Results'

function Congresses({ onCongresses }) {

    return (

        <section className="congresses">

            <h1>Your Congresses</h1>

            <Results onResults={onCongresses} />
            
        </section>
    )
}

export default Congresses
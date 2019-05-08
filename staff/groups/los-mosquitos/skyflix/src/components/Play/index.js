import React from 'react'
import Logic from '../../logic'

function Play ({movie}){
    
    return <section >
<iframe width="560" height="315" src={movie} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </section>
}

export default Play
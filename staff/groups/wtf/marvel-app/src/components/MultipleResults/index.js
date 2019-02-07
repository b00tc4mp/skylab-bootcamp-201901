'use strict'

import React from 'react'
import Feedback from '../Feedback'

function MultipleResults({onItemClick, feedback, results}) {
    
    return <section className="container margin-top">
    <div className="columns is-mobile is-multiline is-centered">
    {feedback && <Feedback message={feedback} />}
    {results && results.map(({id, name, path, extension}) => 
        <div key={id} onClick={() => onItemClick(id)} data-id={id} className="column cursor card is-one-third-widescreen is-two-fifths-tablet is-three-quarters-mobile has-text-centered">
            <div className="pointer card-image">
                <figure className="image is-centered">
                    <img className="hover" src={`${path}/detail.${extension}`}/>
                </figure>
            </div>
            <div className="card-content is-centered">
                <h4 className="title is-4">{name}</h4>
            </div>
        </div>
    )}  
        </div> 
    </section>
}
        




export default MultipleResults


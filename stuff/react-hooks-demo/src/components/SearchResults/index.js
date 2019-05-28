import React from 'react'
import Feedback from '../Feedback'

export default function SearchResults( { onCharacterSelected, feedback, characters, searching } ) {
    
    return (
    <section>
        <div className="columns is-mobile is-multiline is-centered">
        {feedback && <Feedback message={feedback} />}
        {searching && <span><i className="favourite__loading fas fa-spinner fa-spin fa-2x" /></span>}
        {characters && characters.map(({id, name, path, extension}) => 
            <div key={id} onClick={() => onCharacterSelected(id)} data-id={id} className="column cursor card is-one-third-widescreen is-two-fifths-tablet is-three-quarters-mobile has-text-centered">
                <div className="pointer card-image">
                    <figure className="image is-centered">
                        <img alt='character' className="hover" src={`${path}/detail.${extension}`}/>
                    </figure>
                </div>
                <div className="card-content is-centered">
                    <h4 className="title is-6 black">{name}</h4>
                </div>
            </div>
        )}  
            </div> 
    </section>
    )
}



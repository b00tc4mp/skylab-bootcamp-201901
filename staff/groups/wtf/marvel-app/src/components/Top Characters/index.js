'use strict'

import React, {Component} from 'react'

class TopCharacter extends Component {

    state = {results: [{"id": "1009662", "name" : "Thing", "src": "http://i.annihil.us/u/prod/marvel/i/mg/9/00/527bb4d36b5c2/detail.jpg"}, {"id": "1009185", "name" : "Black Cat", "src": "http://i.annihil.us/u/prod/marvel/i/mg/e/03/526952357d91c/detail.jpg"}, {"id": "1009368", "name":"Iron Man", "src":"http://i.annihil.us/u/prod/marvel/i/mg/9/c0/527bb7b37ff55/detail.jpg"} ]}


    render(){

        const {state:{results}, props:{onCharacterSelected}} = this

        return <section className="container has-text-centered margin-top">
        <h2 className="title is-4 white">Top Characters</h2>
        <div className="columns is-mobile is-multiline is-centered">
            {results && results.map(({id, src}) => 
            
                <div key={id} onClick={() => onCharacterSelected(id)} data-id={id} className="column cursor card is-one-fourth-widescreen is-three-quarters-mobile has-text-centered">
                    <div className="pointer card-image">
                        <figure className="image is-centered">
                            <img className="hover" src={src}/>
                        </figure>
                    </div>
                </div>
            )} 
        </div> 
    </section>
    }


}

export default TopCharacter
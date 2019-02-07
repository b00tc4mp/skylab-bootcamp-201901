'use strict'

import React, {Component} from 'react'

class TopComics extends Component {

    state = {results: [{"id": "74730", "src": "http://i.annihil.us/u/prod/marvel/i/mg/2/e0/5c523cb262345/detail.jpg"}, {"id": "73817", "src": "http://i.annihil.us/u/prod/marvel/i/mg/6/b0/5c523b9e674c4/detail.jpg"}, {"id": "73033", "src":"http://i.annihil.us/u/prod/marvel/i/mg/9/50/5c523c7b95b2d/detail.jpg"} ]}


    render(){

        const {state:{results}, props:{onComicSelected}} = this

        return <section className="container has-text-centered margin-top">
        <h2 className="title is-4 white margin-top">Top Comics</h2>
        <div className="columns is-mobile is-multiline is-centered">
        {results && results.map(({id, src}) => 
        
            <div key={id} onClick={() => onComicSelected(id)} data-id={id} className="column cursor card is-one-fourth-widescreen is-three-quarters-mobile has-text-centered">
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

export default TopComics
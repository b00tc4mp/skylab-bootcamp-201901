'use strict'

import React, {Fragment} from 'react'
import Feedback from '../Feedback'

function PaintComic({onItemClick, feedback, results}) {

    return  <section className="container">
    {feedback && <Feedback message={feedback} />}
    {results && <Fragment> 
    <div key={results.id} data-id={results.id}  className="tile is-ancestor">
        <div className="tile is-vertical is-8">
        <div className="tile is-parent">
            <article className="tile is-child notification">
                <figure className="image is-4by3">
                    <img src={`${results.thumbnail.path}/detail.${results.thumbnail.extension}`}/>
                    </figure>
                    <p className="title">{results.title}</p>
                    <div className="content">{results.description}</div>
                    {results.prices[0].price && <p>Price: {results.prices[0].price}€</p>}
                    {results.urls[0].url && <a target="_blank "href={results.urls[0].url}>More info</a>}
            </article>
        </div>
        </div>
        <div className="tile is-parent">
        <article className="tile is-child notification">
            <div className="content">
            <p className="title">Characters</p>
            <ul className="content">
                {results.characters && results.characters.items.map(({name, resourceURI}) => {
                    const uri = resourceURI.split('/')
                    var id = uri.pop() || uri.pop()
                    return <li className="results__item pointer" key={id} onClick={() => onItemClick(id)} >{name}</li>
                }
                )}
            </ul>
            </div>
        </article>
        </div>
    </div>
    </Fragment>
    } 
    }
    
  </section>
}

export default PaintComic;
'use strict'

import React, {Fragment} from 'react'
import Feedback from '../Feedback'

function PaintComic({onItemClick, feedback, results, characters, price, moreInfo}) {

    return  <section className="container has-text-centered">
    {feedback && <Feedback message={feedback} />}
    {feedback === null && results === null && <span><i className="favourite__loading fas fa-spinner fa-spin fa-3x white" /></span>}
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
                    {results.prices[0].price && <p>{price}: {results.prices[0].price}€</p>}
                    {results.urls[0].url && <a target="_blank " className="button is-small is-outlined is-info" href={results.urls[0].url}>{moreInfo}</a>}
            </article>
        </div>
        </div>
        <div className="tile is-parent">
        <article className="tile is-child notification">
            <div className="content">
            <p className="title">{characters}</p>
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
    
  </section>
}

export default PaintComic;
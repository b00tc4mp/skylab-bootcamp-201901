'use strict'

import React, {Fragment} from 'react'
import Feedback from '../Feedback'

function PaintCharacter({onItemClick, feedback, results}) {

    console.log(results)

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
                    <p className="title">{results.name}</p>
                    <div className="content">{results.description}</div>
                    {results.urls[1].url && <a target="_blank "href={results.urls[1].url}>More info</a>}
            </article>
        </div>
        </div>
        <div className="tile is-parent">
        <article className="tile is-child notification">
            <div className="content">
            <h4 className="title">Comics</h4>
            <ul className="content">
                {results.comics && results.comics.items.map(({name, resourceURI}) => {
                    const uri = resourceURI.split('/')
                    var id = uri.pop() || uri.pop();
                    return <li className="results__item pointer grow-rotate" key={id} onClick={() => onItemClick(id)} >{name}</li>
                }
                )}
                {results.urls[2].url && <li><a target="_blank " href={results.urls[2].url} >See all comics</a></li>}
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

export default PaintCharacter;
'use strict'

import React, {Fragment} from 'react'
import Feedback from '../Feedback'

function PaintCharacter({onItemClick, feedback, results}) {

    return  <section className="container">
    {feedback && <Feedback message={feedback} />}
    {results && <Fragment> 
    <div key={results.id} data-id={results.id}  className="tile is-ancestor">
        <div className="tile is-vertical is-8">
        <div className="tile is-parent">
            <article className="tile is-child notification is-danger">
                <figure className="image is-4by3">
                    <img src={`${results.thumbnail.path}/detail.${results.thumbnail.extension}`}/>
                    </figure>
                    <p className="title">{results.name}</p>
                    <div className="content">{results.description}</div>
            </article>
        </div>
        </div>
        <div className="tile is-parent">
        <article className="tile is-child notification is-success">
            <div className="content">
            <p className="title">Comics</p>
            <ul className="content">
                {results.comics && results.comics.items.map(({name, resourceURI}) => {
                    const uri = resourceURI.split('/')
                    var id = uri.pop() || uri.pop();
                    return <li className="results__item" key={id} onClick={() => onItemClick(id)} >{name}</li>
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

export default PaintCharacter;
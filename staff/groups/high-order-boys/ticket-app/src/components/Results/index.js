import React, { Component } from 'react'
import './index.sass'

class  Results extends Component {

    handleDetail = id => {
        const { props:{onEventDetail} } = this

        onEventDetail(id)
    } 

    render() {
        const { props:{ results }, handleDetail} = this

        return<section className='columns is-multiline is-mobile is-centered'>
            {results && results.map(result => (<div className='column is-three-quarters-mobile is-two-fifths-tablet is-one-quarter-widescreen'>
                <div className='card' key={result.id}>
                    {result.images && <div className='card-image'>
                        <figure className='image is-4by3'>
                            {result.images && <img src={result.images[0].url} alt={result.name} className="resultImage"/> }
                        </figure>
                    </div>}
                    {result && <div className='card-content'>
                        <h4 className='cardTitle'>{result.name}</h4>
                        {results.classifications&& <p className="tag">{result.classifications[0].genre.name}</p>}
                        {results.classifications&& <p className="tag">{result.classifications[0].segment.name}</p>}
                        {results.classifications&& <p className="tag">{result.classifications[0].subGenre.name}</p>}
                        <button className="button is-fullwidth is-danger is-outlined eventButton" onClick={() => handleDetail(result.id)}>Details</button>
                    </div>}
                </div>
            </div>))}
        </section>
    }

}

export default Results

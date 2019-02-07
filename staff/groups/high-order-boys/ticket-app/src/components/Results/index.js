import React, { Component } from 'react'

class  Results extends Component {

    handleDetail = id => {
        const { props:{onEventDetail} } = this

        onEventDetail(id)
    } 

    render() {
        const { props:{ results }, handleDetail} = this

        return<section className='columns is-multiline is-mobile is-centered'>
            {results && results.map(result => (<div className='column is-three-quarters-mobile is-two-fifths-tablet one-third-in-desktop'>
                <div className='card' key={result.id}>
                    {result.images && <div className='card-image'>
                        <figure className='image is-4by3'>
                            <img src={result.images[0].url} alt={result.name}/>
                        </figure>
                    </div>}
                    {result && <div className='card-content'>
                        <h4 className='title'>{result.name}</h4>
                        <p>{result.classifications[0].genre.name}</p>
                        <p>{result.classifications[0].segment.name}</p>
                        <p>{result.classifications[0].subGenre.name}</p>
                        <button onClick={() => handleDetail(result.id)}>Details</button>
                    </div>}
                </div>
            </div>))}
        </section>
    }

}

export default Results

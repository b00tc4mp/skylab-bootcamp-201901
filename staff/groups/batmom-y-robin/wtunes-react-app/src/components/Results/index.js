import React from 'react'
import './index.sass'

function Results({ error, items, onPlayer }) {



    return <div className="results">
        <section className="container">
            <div className='columns is-multiline is-mobile is-centered'>
            {
            items.map(({ trackName, artistName, previewUrl, artWork, genere }) =>{

                return <div key={previewUrl} className="column is-2-desktop is-3-tablet is-5-mobile box"  onClick={() => onPlayer(previewUrl)}>
                        <img src={artWork} />
                        <h3>{trackName}</h3>
                        <h4>{artistName}</h4>
                        <p>{genere}</p>
                    </div>
                })
            }
            </div>
        </section>
    </div>
}

export default Results

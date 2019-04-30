import React from 'react'

function Results({ error, items, onPlayer }) {



    return <section className="results">
        <h2>results</h2>
        <ul>
        {
        items.map(({ trackName, artistName, previewUrl, artWork, genere }) =>{

            return <li key={previewUrl} onClick={() => onPlayer(previewUrl)}>
                    <h3>{trackName}</h3>
                    <h4>{artistName}</h4>
                    <p>{genere}</p>
                    <img src={artWork} />
                </li>
            })
        }
        </ul>
    </section>
}

export default Results

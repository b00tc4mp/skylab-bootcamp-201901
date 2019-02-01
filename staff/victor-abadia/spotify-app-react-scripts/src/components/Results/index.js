import React, { Component } from 'react';

function Results({ results, onItemClick }) {
    return <section className="results container" >
        <ul>
            {results.map(({ id, name, images }) => <li key={id} onClick={() => onItemClick(id)}>{name}
                <img className="images" src={images[0] ? images[0].url : 'https://developer.spotify.com/assets/branding-guidelines/icon3@2x.png'} alt="artis-image"></img>
            </li>)}
        </ul>
    </section>
}

export default Results;
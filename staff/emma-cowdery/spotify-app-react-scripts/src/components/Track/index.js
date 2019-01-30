import React from 'react'
import './index.sass'

function Track({ track, onAddFavorite }) {
    return <section className="container panel">
        <h3>Track</h3>
        <div data-id={track.id}>
            <h3>{track.name}</h3>
            <audio controls autoPlay loop className="audio" src={track.preview_url}></audio>
        </div>
        <button onClick={() => onAddFavorite(track.id)}><i className="far fa-heart"></i></button>
    </section>
}

export default Track
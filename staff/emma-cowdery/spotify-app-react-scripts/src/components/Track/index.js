import React from 'react'
import './index.sass'

function Track({ track, onAddFavourite, userFavourites }) {
    debugger
    return <nav className="navbar is-fixed-bottom trackPlayer" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
            <h3 className="navbar-item">Now playing:</h3>
            <div className="navbar-item" data-id={track.id}>
                <h3>{track.name}</h3>
                <audio controls autoPlay loop className="audio" src={track.preview_url}></audio>
            </div>
        </div>
        <div className="navbar-end">
            <button className={userFavourites.includes(track.id) ? `navbar-item button is-danger far fa-heart` : `navbar-item button is-light far fa-heart` } onClick={() => onAddFavourite(track.id)}></button>
        </div>
    </nav>
}

export default Track
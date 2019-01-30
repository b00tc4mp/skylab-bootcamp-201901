import React, { Component } from 'react'
import './index.sass'
import Track from '../Track'


class Tracks extends Component {
    state = { id: '', track: null, trackVisual: false }

    handleToAlbums = event => {
        event.preventDefault()

        this.props.toAlbums()
    }

    handleToArtists = event => {
        event.preventDefault()

        this.props.toArtists()
    }

    handleTracksId = (id) => {
        this.props.handleTracksId(id)

        this.setState({ trackVisual: true })
    }

    handleAddFavourite = (id) => {
        this.props.onAddFavourite(id)

    }

    render() {
        const { handleToAlbums, handleToArtists, handleTracksId, handleAddFavourite, props: { tracksList, albumCover }, state: { trackVisual } } = this
        return <section className="container panel">
            <h3>Tracks</h3>
            <button onClick={handleToArtists} className="button">Back to Artists</button>
            <button onClick={handleToAlbums} className="button">Back to Albums</button>
            <div className="columns is-multiline is-centered is-mobile cards">
                {
                    tracksList.map(tracks => {
                        return <div key={tracks.id} onClick={() => handleTracksId(tracks.id)} className="card column is-one-quarter-widescreen is-one-third-desktop is-half-tablet is-three-quarters-mobile is-centered card" data-id={tracks.id}>
                            <div className="card-content">
                                <img className="is-rounded" src={albumCover} alt=''/>
                                <p className="titte">{tracks.name}</p>
                                <p className="content">Album: {tracks.album}</p>
                                <p className="content">{Math.round((tracks.duration_ms / 60000) * 100) / 100}min</p>
                                {/* <div className="content">{trackVisual && <Track track={this.props.track}/>}</div> */}
                            </div>
                        </div>
                    })
                }
            </div>
            <footer>
                {trackVisual && <Track track={this.props.track} onAddFavorite={handleAddFavourite} />}
            </footer>
        </section>
    }
}

export default Tracks
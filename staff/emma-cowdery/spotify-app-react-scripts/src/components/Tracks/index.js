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
        const { handleToAlbums, handleToArtists, handleTracksId, handleAddFavourite, props: { tracksList }, state: { trackVisual } } = this
        return <section className="tracksPanel">
            <div className="level">
                <h3 className="title level-left tracksTitle">Tracks</h3>
                <div className="level-right backButtons">
                    <nav class="breadcrumb" aria-label="breadcrumbs">
                        <ul>
                            <li><p className="backTo" onClick={handleToArtists}>Back to Artists</p></li>
                            <li><p className="backTo" onClick={handleToAlbums}>Back to Albums</p></li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div className="container">
                {
                    tracksList.map(tracks => {
                        return <div key={tracks.id} onClick={() => handleTracksId(tracks.id)} className="level tracks" data-id={tracks.id}>
                            <div className="level-left">
                                <i class="fas fa-play-circle playIcon"></i>
                                <p className="titte">{tracks.name}</p>
                            </div>
                            <div className="level-right">
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
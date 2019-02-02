import React, { Component } from 'react'
import './index.sass'
import Track from '../Track'
import logic from '../../logic';


class Tracks extends Component {
    state = { id: '', track: null, trackVisual: false, userFavourites: null}

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

    handleAddFavourite = (trackId) => {
        console.log('sfss')
        try {
            logic.favouritedSongs(this.props.user.email, trackId, (favourited) => {
                debugger
                this.setState(favourited)
                //console.log(favourited)
                console.log('dffd')
            })
        } catch(err) {
            console.error(err)
        }
    }

    render() {
        const { handleToAlbums, handleToArtists, handleTracksId, handleAddFavourite, props: { tracksList }, state: { trackVisual, favourited } } = this
        return <section className="tracksPanel">
            <div className="level">
                <h3 className="title level-left tracksTitle">Tracks</h3>
                <div className="level-right backButtons">
                    <nav className="breadcrumb" aria-label="breadcrumbs">
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
                                <i className="fas fa-play-circle playIcon"></i>
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
                {trackVisual && <Track track={this.props.track} onAddFavorite={handleAddFavourite} userFavourites={favourited}/>}
            </footer>
        </section>
    }
}

export default Tracks
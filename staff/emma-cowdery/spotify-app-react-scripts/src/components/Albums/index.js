import React, { Component } from 'react'
import './index.sass'


class Albums extends Component {
    state = { id: '' }

    handleToArtists = event => {
        event.preventDefault()

        this.props.toArtists()
    }

    render() {
        const { handleToArtists, props: { albumsList, handleAlbumId } } = this

        return <section className="container panel">
            <h3>Albums</h3>
            <button onClick={handleToArtists} className="button">Back to Artists</button>
            <div className="columns is-multiline is-centered is-mobile cards">
                {
                    albumsList.map(album => {
                        const image = album.images[0] ? album.images[0].url : 'https://i.pinimg.com/originals/35/87/f8/3587f8e9df02e2990b93afb9cd6d2323.jpg'
                        return <div key={album.id} onClick={() => handleAlbumId(album.id, image)} className="card column is-one-quarter-widescreen is-one-third-desktop is-half-tablet is-three-quarters-mobile is-centered card" data-id={album.id}>
                            <div className="card-image">
                                <figure className="image is-128by128">
                                    <img className="is-rounded" src={image} alt=''/>
                                </figure>
                            </div>
                            <div className="card-content">
                                <p className="titte">{album.name}</p>
                                <p className="content">{album.release_date}</p>
                            </div>
                        </div>
                    })
                }
            </div>
        </section>
    }
}

export default Albums
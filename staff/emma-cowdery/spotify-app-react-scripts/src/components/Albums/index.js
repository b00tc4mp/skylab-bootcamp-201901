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

        return <section className="albumPanel">
            <div className="level">
                <h3 className="title albums level-left">Albums</h3>
                <p onClick={handleToArtists} className="level-right artistButton">Back to Artists</p>
            </div>
            <div className="container">
                <div className="columns is-multiline is-centered is-mobile cards">
                    {
                        albumsList.map(album => {
                            const image = album.images[0] ? album.images[0].url : 'https://i.pinimg.com/originals/35/87/f8/3587f8e9df02e2990b93afb9cd6d2323.jpg'
                            return <div key={album.id} onClick={() => handleAlbumId(album.id, image)} className="card column is-one-quarter-widescreen is-one-third-desktop is-half-tablet is-three-quarters-mobile is-centered albumCard" data-id={album.id}>
                                <div className="card-image">
                                    <figure className="image albumImg">
                                        <img className="is-rounded" src={image} alt=''/>
                                    </figure>
                                </div>
                                <div className="card-content mainAlbumInfo">
                                    <p className="titte albumName">{album.name}</p>
                                    <p className="content albumInfo">{album.release_date}</p>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </section>
    }
}

export default Albums
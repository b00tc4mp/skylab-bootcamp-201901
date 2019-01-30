import React, { Component } from 'react'
import './index.sass'

class Artist extends Component {
    state = { id: '' }

    // handleId = (event, id) => {
    //     //event.preventDefault()

    //     const { state: { id }, props: { onArtistClick } } = this

    //     onArtistClick(id)
    // }

    render() {
        const { props: { artistsList, handleArtistId } } = this

        return <section className="container panel">
            <h3>Artists</h3>
            <div className="columns is-multiline is-centered is-mobile cards">
                {
                    artistsList.map(artist => {
                        const image = artist.images[0] ? artist.images[0].url : 'https://i.pinimg.com/originals/35/87/f8/3587f8e9df02e2990b93afb9cd6d2323.jpg'
                        return <div key={artist.id} onClick={() => handleArtistId(artist.id)} className="card column is-one-quarter-widescreen is-one-third-desktop is-half-tablet is-three-quarters-mobile is-centered card" data-id={artist.id}>
                            <div className="card-image">
                                <figure className="image is-128by128">
                                    <img className="is-rounded" src={image} alt=''/>
                                </figure>
                            </div>
                            <div className="card-content">
                                <p className="tittle">{artist.name}</p>
                                <p className="content">{artist.genres.join(', ')}</p>
                            </div>
                            <footer className="card-footer">
                                <div className="card-footer-item">
                                    <p>Followers:<br></br>{artist.followers.total}</p>
                                </div>
                                <div className="card-footer-item">
                                    <p>Popularity:<br></br>{artist.popularity}</p>
                                </div>
                            </footer>
                        </div>
                    })
                }
            </div>
        </section>
    }
}

export default Artist
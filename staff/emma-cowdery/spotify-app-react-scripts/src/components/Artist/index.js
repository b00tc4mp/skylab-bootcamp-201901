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

        return <section className="artistPanel">
            <h3 className="title artists">Artists</h3>
            <div className="container">
                <div className="columns is-multiline is-centered is-mobile cards">
                    {
                        artistsList.map(artist => {
                            const image = artist.images[0] ? artist.images[0].url : 'https://i.pinimg.com/originals/35/87/f8/3587f8e9df02e2990b93afb9cd6d2323.jpg'
                            return <div key={artist.id} onClick={() => handleArtistId(artist.id)} className="card column is-one-fifth-widescreen is-one-quarter-desktop is-one-third-tablet is-three-quarters-mobile is-centered artistCard" data-id={artist.id}>
                                <div className="card-image">
                                    <figure className="image artistImg">
                                        <img className="is-rounded" src={image} alt=''/>
                                    </figure>
                                </div>
                                <div className="card-content mainArtistInfo">
                                    <p className="tittle artistName">{artist.name}</p>
                                    <p className="content artistInfo">{artist.genres.join(', ')}</p>
                                </div>
                                <footer className="card-footer">
                                    <div className="card-footer-item moreInfo">
                                        <p>Followers:<br></br>{artist.followers.total}</p>
                                    </div>
                                    <div className="card-footer-item moreInfo">
                                        <p>Popularity:<br></br>{artist.popularity}</p>
                                    </div>
                                </footer>
                            </div>
                        })
                    }
                </div>
            </div>
        </section>
    }
}

export default Artist
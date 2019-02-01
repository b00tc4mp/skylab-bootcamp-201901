import React from 'react'

function Artists({ artists, getArtistId }) {

    return <section className="results container p-3">
        <ul className="row container">
            {
                artists.map(artist => {
                    const image = artist.images[0] ? artist.images[0].url : 'https://cdn.pixabay.com/photo/2016/06/01/09/21/music-1428660_960_720.jpg'
                    return <div key={artist.id} style={{ cursor: 'pointer' }} onClick={() => getArtistId(artist.id)} data-id={artist.id} className="card col-12 col-sm-6 col-md-4">
                        <li key={artist.id}>
                            <img className="card-img-top" src={image} width="150px" />
                            <p className="card-title text-center">{artist.name}</p>
                        </li>
                    </div>
                })
            }
        </ul>
    </section>
}

export default Artists
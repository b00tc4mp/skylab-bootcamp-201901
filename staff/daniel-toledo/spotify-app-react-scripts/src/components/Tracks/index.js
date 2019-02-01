import React from 'react'

function Tracks({ image, tracks, getTrackId }) {

    return <section className="results container">
        <div className="row flex">
            <img src={image} className="col-12 col-sm-6" width="40%" />
            <ul className="col-sm-6 pt-5 pl-3">
                {
                    tracks.map(track => {
                        return <li key={track.id} onClick={() => getTrackId(track.id)} data-id={track.id} style={{ cursor: 'pointer' }} className="mb-1">{track.name}</li>
                    })
                }
            </ul>
        </div>
    </section>
}

export default Tracks
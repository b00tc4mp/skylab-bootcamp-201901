import React, { Component } from 'react'

import './index.sass'

class Video extends Component  {

    onVideoClick = id => {
        const {props: {onVideoSelected}} = this
        onVideoSelected(id)
    }

    render () {
        const {props: {video}, onVideoClick} = this
        
        if (video.Poster === "N/A")  video.Poster = "http://www.lbsnaa.gov.in/upload/academy_souvenir/images/59031ff5e92caNo-image-available.jpg"

        return (
        
            <section onClick={() => onVideoClick(video.imdbID)} className="video card column is-4">
                <div className="card-image">
                    <figure className="image">
                        <img src={video.Poster} alt={video.Title} />
                    </figure>
                </div>

                <div className="card-content">
                    <div className="content">
                    <h6>{video.Title}</h6>
                    <div className="tags">
                        <span className="tag is-info">{video.Year}</span>
                        <span className="tag is-success">{video.Type}</span>
                    </div>
                    </div>
                </div>
            </section>
            )
            }
}

export default Video
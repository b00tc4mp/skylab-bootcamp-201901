import React, { Component } from 'react'

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
                <div class="card-image">
                    <figure class="image">
                        <img src={video.Poster} alt={video.Title} />
                    </figure>
                </div>

                <div class="card-content">
                    <div class="content">
                    <h6>{video.Title}</h6>
                    <div class="tags">
                        <span class="tag is-info">{video.Year}</span>
                        <span class="tag is-success">{video.Type}</span>
                    </div>
                    </div>
                </div>
            </section>
            )
            }
}

export default Video
import React, { Component } from 'react'

class Video extends Component  {
    

    onVideoClick = id => {
        //this.setState({ videoSelected: id })
        console.log('Desde VIDEO', id)
        const {props: {onVideoSelected}} = this
        onVideoSelected(id)
    }

    render () {
        const {props: {video}, onVideoClick} = this
        
        return <section onClick={() => onVideoClick(video.imdbID)}>
                            <h3>{video.Title}</h3>
                            <p>{video.Type}</p>
                            <p>{video.Year}</p>
                            <img src={video.Poster} alt={video.Title}/>
                        </section>
            }
}

export default Video
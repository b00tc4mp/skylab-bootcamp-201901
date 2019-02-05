import React, { Component } from 'react'

import Video from '../Video'
import Detail from '../Detail'
import logic from '../../logic'

class Results extends Component  {
    
    state = { videoSelected: null }

    handleVideoClick = id => {
        console.log(this.props)
        logic.retrieveVideo(id)
            .then(details => {
                console.log('DDD', details)
                this.setState({ videoSelected: details}) })
            .catch()
        console.log('Desde Results', id)
    }

    handleVideoClose = () => {
        console.log('llega aquí!')
        this.setState({ videoSelected: null })
    }

    render() {
        const {
            props : {results}, 
            state : {videoSelected}, 
                    handleVideoClick,
                    handleVideoClose
            } = this

        console.log(results)
        return (
            <section className="results">
                <h1>Hola</h1>
                {(results || []).map(video => 
                    <Video 
                       key={video.imdbID} 
                       video={video} 
                       onVideoSelected={handleVideoClick}
                    /> 
                )}

                {videoSelected && <Detail 
                                    detail={videoSelected} 
                                    onVideoClose={handleVideoClose} 
                                  />}

            </section>
        )
    }
}

export default Results
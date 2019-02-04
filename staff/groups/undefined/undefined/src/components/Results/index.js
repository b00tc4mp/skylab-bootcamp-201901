import React, { Component } from 'react'
import Video from '../Video'

class Results extends Component  {
    
    state = { videoSelected: null }

    handleVideoClick = id => {
        //this.setState({ videoSelected: id })
        console.log('Desde Results', id)
    }

    render() {
        const {props : {results}, handleVideoClick} = this
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
            </section>
        )
    }
}

export default Results
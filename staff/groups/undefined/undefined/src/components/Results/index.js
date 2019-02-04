import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'

import Video from '../Video'
import Detail from '../Detail'
import logic from '../../logic'

class Results extends Component  {
    
    state = { videoSelected: null }

    componentDidMount() {
        const {match: {params: {id}}} = this.props
        id && this.handleVideoClick(id)
    }

    handleVideoClick = id => {
        this.props.history.push(`/video/${id}`)
        logic.retrieveVideo(id)
            .then(details => {
                console.log('DDD', details)
                this.setState({ videoSelected: details}) })
            .catch()
        //
        console.log('Desde Results', id)
    }

    returnVideos =() => {
        this.setState({videoSelected: null})
    }

    render() {
        const {
            props : {results}, 
            state : {videoSelected}, 
                    handleVideoClick
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

                {videoSelected && <Detail detail={videoSelected} returnVideos={videoSelected}/>}

            </section>
        )
    }
}

export default withRouter(Results)
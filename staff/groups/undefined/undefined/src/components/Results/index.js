import React, { Component } from 'react'

import Video from '../Video'
import Detail from '../Detail'
import logic from '../../logic'

class Results extends Component  {
    
    state = { videoSelected: null, results: null, query: null }

    // handleVideoClick = id => {
    //     console.log(this.props)
    //     logic.retrieveVideo(id)
    //         .then(details => {
    //             console.log('DDD', details)
    //             this.setState({ videoSelected: details}) })
    //         .catch()
    //     console.log('Desde Results', id)
    // }

    // handleVideoClose = () => {
    //     console.log('llega aquí!')
    //     this.setState({ videoSelected: null })
    // }


    componentDidMount () {
        const {props:{query}, handleSearch} = this

        handleSearch(query) 
    }

    handleSearch = query =>{
        try {
            logic.searchVideos(query)
                .then(results => {
                    this.setState({ results, searchFeedback: null })                
                })
                .catch( ({message}) => {
                    this.setState({ results: null, searchFeedback: message })
                }) 
        } catch ({message}) {
            this.setState({ results: null, searchFeedback: message })
        }
    }

    static getDerivedStateFromProps(props, state) {

        if (props.query !== state.query)
            return {
                query: props.query
            }

        return null
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        const { props: { query } } = this

        if (query !== prevProps.query)
            this.handleSearch(query)
    }

    render() {
        const {
            state : {videoSelected, results},   
                    handleVideoClick,
                    handleVideoClose
            } = this
            
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
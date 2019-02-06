import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'

import Video from '../Video'
import Detail from '../Detail'
import logic from '../../logic'

class Results extends Component  {
    
    state = { videoSelected: null, results: null, query: null }

    handleVideoClick = id => {
        this.props.history.push(`/videos/${this.state.query}/detail/${id}`)
    }

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

    componentDidUpdate(prevProps) {

        const { props: { query } } = this

        if (query !== prevProps.query)
            this.handleSearch(query)
    }

    render() {
        const {
            state : {results},   
                    handleVideoClick
            } = this
            
        return (
            <section className="results">
                <h1>Hola</h1>
                {(results || []).map(video => 
                    <Video 
                       key={video.imdbID} 
                       video={video} 
                       query={this.state.query}
                       onVideoSelected={handleVideoClick}
                    /> 
                )}

                <Route path='/videos/:query/detail/:id' component = {Detail}/>

            </section>
        )
    }
}

export default withRouter(Results)
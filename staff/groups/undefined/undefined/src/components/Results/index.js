import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'

import Video from '../Video'
import Detail from '../Detail'
import logic from '../../logic'
import Feedback from '../Feedback'


import './index.sass'


class Results extends Component  {
    
    state = { videoSelected: null, results: null, query: null, searchFeedback:null, countPagination:0 }

    countPage = 2    

    handleVideoClick = id => {
        this.props.history.push(`/home/videos/${this.state.query}/detail/${id}`)
    }

    componentDidMount () {
        const {props:{query}, handleSearch} = this

        this.countPage = 2
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

    handleMoreResults = () => {
        logic.searchVideos(this.props.query, this.countPage++)
                .then(results => {
                    this.setState({ results, searchFeedback: null })                
                })
                .catch( ({message}) => {
                    this.setState({ results: null, searchFeedback: message })
                }) 
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
        const {searchFeedback} = this.state
            
        return (
            <section className="results section columns is-multiline">
                {(results || []).map(video => 
                    <Video 
                       key={video.imdbID} 
                       video={video} 
                       query={this.state.query}
                       onVideoSelected={handleVideoClick}
                    /> 
                )}

                <button onClick={this.handleMoreResults}>More Results</button>

                { searchFeedback && <Feedback message={searchFeedback} level="warn" /> }

                <Route path='/home/videos/:query/detail/:id' component={Detail}/>

            </section>
        )
    }
}

export default withRouter(Results)
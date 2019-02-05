import React, { Component } from 'react'

import Search from '../Search'
import logic from '../../logic'
import Results from '../Results'

class Home extends Component {
    state = { videos: null, searchFeedback: null }

    handleSearch = query => {
        try {
            logic.searchVideos(query)
                .then(results => {
                    console.log(results)
                    this.setState({ videos: results, searchFeedback: null })                
                })
                .catch( ({message}) => { //async errors from api = Movie not fund!
                    this.setState({ videos: null, searchFeedback: message })
                }) 
        } catch ({message}) { // sync errors from logic =
            this.setState({ videos: null, searchFeedback: message })
        }
    }

    render() {
        const { handleSearch , state : { videos, searchFeedback }} = this

        return (
            <section className="home">
                <Search onSearch={handleSearch} feedback={searchFeedback} />
                {videos && <Results results={videos} />}
            </section >
        )
    }
}
export default Home
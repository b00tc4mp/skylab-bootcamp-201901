import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom' 

import Search from '../Search'
import logic from '../../logic'
import Results from '../Results'

class Home extends Component {
    state = { videos: null, searchFeedback: null }

    // handleSearch = query => {
    //     try {
    //         logic.searchVideos(query)
    //             .then(results => {
    //                 console.log(results)
    //                 this.setState({ videos: results, searchFeedback: null })                
                    
    //                 this.props.history.push(`/videos/${query}`)
    //             })
    //             .catch( ({message}) => { //async errors from api = Movie not fund!
    //                 this.setState({ videos: null, searchFeedback: message })
    //             }) 
    //     } catch ({message}) { // sync errors from logic =
    //         this.setState({ videos: null, searchFeedback: message })
    //     }
    // }

    handleSearch = query => {
        this.props.history.push(`/videos/${query}`)
    }

    

    render() {
        const { handleSearch , state : { videos, searchFeedback }} = this

        return (
            <section className="home">
                <Search onSearch={handleSearch} feedback={searchFeedback} />
                <Route path='/videos/:query' render={(props) => <Results query={props.match.params.query} />} />
            </section >
        )
    }
}
export default withRouter(Home)
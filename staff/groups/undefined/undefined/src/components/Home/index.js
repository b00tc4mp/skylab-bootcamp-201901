import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'

import Search from '../Search'
import Results from '../Results'

class Home extends Component {
    state = { videos: null, searchFeedback: null }

    handleSearch = query => {
        this.props.history.push(`/videos/${query}`)
    }

    render() {
        const { handleSearch , state : { searchFeedback }} = this

        return (
            <section className="home">
                <Search onSearch={handleSearch} feedback={searchFeedback} />
                <Route path='/videos/:query' render={(props) => <Results query={props.match.params.query} />} />
            </section >
        )
    }
}
export default withRouter(Home)
import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'

import Search from '../Search'
import Results from '../Results'

import './index.sass'

class Home extends Component {
    state = { videos: null, searchFeedback: null }

    handleSearch = query => {
        this.props.history.push(`/home/videos/${query}`)
    }

    render() {
        const { handleSearch } = this

        return (
            <section className="home columns is-fullheight">
                <div className="container column is-10">
                    <Search onSearch={handleSearch} />
                    <Route path='/home/videos/:query' render={(props) => <Results query={props.match.params.query} />} />

                </div>
            </section >
        )
    }
}
export default withRouter(Home)
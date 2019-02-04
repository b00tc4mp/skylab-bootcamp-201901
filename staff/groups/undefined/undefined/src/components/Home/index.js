import React, { Component } from 'react'
import { HashRouter } from 'react-router-dom'
import Search from '../Search'
import logic from '../../logic'
import Results from '../Results'

class Home extends Component {
    state = { videos: null }

    handleSearch = query => {
        console.log('Desde la HOME', query)
        logic.searchVideos(query)
        .then(results => {
            this.setState({ videos: results })
        })
    }

    render() {
        const { handleSearch , state : { videos }} = this
        return (
            <section className="home">
                <Search onSearch={handleSearch} />

                <Results results={videos}/>
            </section >
        )
    }
}
export default Home
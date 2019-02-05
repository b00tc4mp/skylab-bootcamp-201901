import React, { Component } from 'react'

import Search from '../Search'
import logic from '../../logic'
import Results from '../Results'

class Home extends Component {
    state = { videos: null }

    handleSearch = query => {
        logic.searchVideos(query)
        .then(results => {
            console.log(results)
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
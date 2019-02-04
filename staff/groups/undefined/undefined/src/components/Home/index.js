import React, { Component } from 'react'
import Search from '../Search'
import logic from '../../logic'

class Home extends Component {

    handleSearch = query => {
        console.log('Desde la HOME', query)
        logic.searchVideos(query)
        .then(results => {
            console.log(results)
        })
    }

    render() {
        const { handleSearch } = this
        return (
            <section className="home">
                <Search onSearch={handleSearch} />
            </section >
        )
    }
}
export default Home
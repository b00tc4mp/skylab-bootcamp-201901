import React, { Component } from 'react'
import Search from '../Search'
import logic from '../../logic'


class Home extends Component {
    render() {
        return (
            <section className="home">
                <h1 className="home__title">Home</h1>
                <Search />
            </section>
        )
    }
}

export default Home
import React, { Component } from 'react'
import Search from '../Search'
import Results from '../Results'
import User from '../User'
import { Route, withRouter } from "react-router-dom";
import logic from '../../logic'


class Home extends Component {
    state = { results: null }

    handleSearch = (city, startDate, endDate) => {
        try {
            logic.retrieveEvents(city, startDate, endDate)
                .then(data => this.setState({ results: data }))
        } catch (err) {
            console.log(err.message)
        }
    }


    render() {
        const { location: { pathname } } = this.props
        const isUser = (pathname.includes("home/user"))
        const { handleSearch, state: { results } } = this

        return <div className='container'>
            {!isUser && <Search onSearch={handleSearch} />}
            {!isUser && results && <Results results={results} />}
            < Route path='/home/user' component={User} />
        </div>
    }
}

export default Home
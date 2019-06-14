import React, { Component } from 'react'
import Feedback from '../Feedback'

class Search extends Component {
    state = { query: null }

    handleQueryInput = event => this.setState({ query: event.target.value })

    handleSearchSubmit = event => {
        event.preventDefault()
        const { state: { query }, props: { onSearch } } = this
        onSearch(query)
    }

    handleViewAll = event => {
        event.preventDefault()
        const { props: { onViewAll } } = this
        onViewAll()
    }

    render() {
        const { handleQueryInput, handleSearchSubmit, handleViewAll } = this
        const { feedback } = this.props

        return (
            <section className="search">
                <form className="search__form" onSubmit={handleSearchSubmit} >
                    <input name="query" placeholder="Search by title" onChange={handleQueryInput} className="search__form--input" required autoComplete="off" />
                    <button className="search__form--button" type="submit">Search</button>
                </form>
                <form className="search__viewAll" onSubmit={handleViewAll}>
                    <button className="search__viewAll--button">View all</button>
                </form>
                {feedback && <Feedback message={feedback} />}
            </section>
        )
    }
}
export default Search
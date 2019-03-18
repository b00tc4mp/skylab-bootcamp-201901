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
                <form className="field is-grouped" onSubmit={handleSearchSubmit} >
                    <p className="control is-expanded">
                        <input
                            name="query"
                            placeholder="Search by title"
                            onChange={handleQueryInput}
                            className="input"
                            required
                            autoComplete="off"
                        />
                    </p>
                    <p className="control">
                        <button className="button is-info" type="submit">Search</button>
                    </p>
                </form>
                <form onSubmit={handleViewAll}>
                    <button>View all</button>
                </form>
                {feedback && <Feedback message={feedback} />}
            </section>
        )
    }
}
export default Search
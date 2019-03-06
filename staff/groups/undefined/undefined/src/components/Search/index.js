import React, { Component } from 'react'
import Feedback from '../Feedback'

import './index.sass'

class Search extends Component {
    state = { query: null }

    handleQueryInput = event => this.setState({ query: event.target.value })

    handleSearchSubmit = event => {
        event.preventDefault()
        const {state: {query}, props: {onSearch}} = this
        onSearch(query)
    }   

    render() {
        const {handleQueryInput, handleSearchSubmit} = this
        const {feedback} = this.props

        return (
            <section className="search">
                <form className="field is-grouped" onSubmit={handleSearchSubmit} >
                <p className="control is-expanded">
                    <input 
                        name="query" 
                        placeholder="Search Movies and Series"
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
                { feedback && <Feedback message={feedback} level="warn" /> }
            </section>
        )
    }
}
export default Search
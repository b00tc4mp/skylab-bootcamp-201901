import React, { Component } from 'react'
import Feedback from '../Feedback'


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
                <form onSubmit={handleSearchSubmit} >
                
                    <input 
                        name="query" 
                        placeholder="Search Movies and Series"
                        onChange={handleQueryInput}
                        className="input"
                        required 
                    />

                    <button type="submit">Search</button>
                    
                </form>
                { feedback && <Feedback message={feedback} level="warn" /> }
            </section>
        )
    }
}
export default Search
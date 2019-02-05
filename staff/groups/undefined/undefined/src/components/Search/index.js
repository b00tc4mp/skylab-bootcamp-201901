import React, { Component } from 'react'
import Feedback from '../Feedback'

class Search extends Component {
    state = { query: '' }
    
    handleSearchSubmit = (event) => {
        event.preventDefault()
        const {query} = this.state
        this.props.onSearch(query)
    }

    handleQueryInput = ({ target: { value: query } }) => this.setState({ query })

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
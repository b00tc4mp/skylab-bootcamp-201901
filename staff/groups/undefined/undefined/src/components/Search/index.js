import React, { Component } from 'react'

class Search extends Component {
    state = { query: '' }
    
    handleSearchSubmit = (event) => {
        event.preventDefault()
        const {query} = this.state
        this.props.onSearch(query)
    }

    // handleQueryInput = event => {
    //     this.setState({ query: event.target.value })
    // }

    handleQueryInput = ({ target: { value: query } }) => this.setState({ query })

    render() {
        const {handleQueryInput, handleSearchSubmit} = this

        return (
            <section className="search">
                <form onSubmit={handleSearchSubmit} >
                
                    <input 
                        name="query" 
                        placeholder="Search Movies and Series"
                        onChange={handleQueryInput}
                        required 
                    />

                    <button type="submit">Search </button>
                    
                </form>
            </section>
        )
    }
}
export default Search
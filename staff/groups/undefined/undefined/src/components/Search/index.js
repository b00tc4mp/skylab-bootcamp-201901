import React, { Component } from 'react'

class Search extends Component {
    state = { query: '' }
    
    handleSearchSubmit = (event) => {
        event.preventDefault()
        const {query} = this.state
        this.props.onSearch(query)
    }

    handleInputChange = event => {
        this.setState({ query: event.target.value })
    }

    render() {
        const {handleInputChange, handleSearchSubmit} = this

        return (
            <section className="search">
                <form onSubmit={handleSearchSubmit} >
                
                    <input 
                        name="query" 
                        placeholder="Search Movies and Series"
                        onChange={handleInputChange}
                        required 
                    />

                    <button type="submit">Search </button>
                    
                </form>
            </section>
        )
    }
}
export default Search
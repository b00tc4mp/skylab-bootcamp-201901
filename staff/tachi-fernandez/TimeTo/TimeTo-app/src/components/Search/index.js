import React, { Component } from 'react'

class Search extends Component {

    handleQueryInput = event => this.setState({query : event.target.value})

    handleSearchSubmit = event => {
        event.preventDefault()
        const {state: {query}, props: {onSearch}} = this
        onSearch(query)
    }   

    render() {
        const {handleSearchSubmit,handleQueryInput} = this
        return (
            <section className="search">
                <h1 className="search__title">Search</h1>
                <form className="search__form" onSubmit={handleSearchSubmit}>
                <input className="search__input" type="text" placeholder="Search events..." onChange={handleQueryInput}  required />
                </form>
            </section>
        )
    }
}

export default Search
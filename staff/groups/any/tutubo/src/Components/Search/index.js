import React, { Component } from 'react'
import './index.sass'

class Search extends Component {

    state = { query: '' }

    handleQueryInput = ({ target: { value: query } }) => this.setState({ query })

    handleSearchSubmit = event => {
        event.preventDefault()

        const { props: { onSearch }, state: { query } } = this

        onSearch(query)
    }

    render() {

        const { handleQueryInput, handleSearchSubmit } = this

        return <section className="container__form">
            <form className="form" onSubmit={handleSearchSubmit}>
                <input className="form__search" type="text" placeholder="Search" onChange={handleQueryInput} />
                <button className="form__button" type="submit"><i className="fas fa-search"></i></button>
            </form>
        </section>
    }
}

export default Search
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

        const { handleQueryInput, handleSearchSubmit, props: {mode} } = this

        return <section className="container__form">
            <form className="form" onSubmit={handleSearchSubmit}>
                <input className={`${mode ? 'form__search form__search-light' : 'form__search form__search-dark'}`} type="text" placeholder="Search" onChange={handleQueryInput} />
                <button className={`${mode? 'form__button form__button-light' : 'form__button form__button-dark'}`} type="submit"><i className={`${mode ? 'fas fa-search fa-search-light' : 'fas fa-search fa-search-dark'}`}></i></button>
            </form>
        </section>
    }
}

export default Search
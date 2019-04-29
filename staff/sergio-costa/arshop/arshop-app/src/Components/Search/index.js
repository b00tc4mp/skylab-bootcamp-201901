import React, { Component } from 'react'
import Feedback from '../Feedback'
import logic from '../../logic'
import { withRouter } from 'react-router-dom'
import './index.sass'

class Search extends Component {
    state = { query: '', feedback: null }

    handleQueryInput = ({ target: { value: query } }) => {
        this.setState({ query })
    }

    handleSearch = event => {
        event.preventDefault()

        const { state: { query }, props: { onSearch } } = this

        if(query.trim().length){
            onSearch(query)
        }
    }

    render() {
        return <section className="search">
            <form className="search__form" onSubmit={this.handleSearch}>
                <input className="search__input" type="text" name="query" placeholder="Search.." autoComplete="off" onChange={this.handleQueryInput}></input>
                <button className="search__btn">
                    <i className="fas fa-search"></i>
                </button>
            </form>
            {this.state.feedback && <Feedback message={this.state.feedback} />}
        </section>
    }
}

export default withRouter(Search)
import React, { Component } from 'react'
import Feedback from '../Feedback'
import logic from '../../logic'
import { withRouter } from 'react-router-dom'
import './index.sass'

class Search extends Component {
    state = { query: '', feedback: null };

    handleQueryInput = ({ target: { value: query } }) => {
        this.setState({ query })
    }

    onSearch = event => {
        event.preventDefault()

        const { state: { query } } = this

        try {
            logic.searchProducts(query)
                .then(() => {
                    this.setState({ feedback: '' })
                    this.props.history.push(`/search/${query}`)
                })
                .catch(({ message }) => this.setState({ feedback: message }))
        } catch ({ message }) {
            this.setState({ feedback: message })
        }
    }

    render() {
        return <section className="search">
            <form className="search__form" onSubmit={this.onSearch}>
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
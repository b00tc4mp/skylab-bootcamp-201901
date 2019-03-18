import React, { Component } from 'react'
import{withRouter} from 'react-router-dom'
import './index.css'

class Search extends Component {
    state = {query : null}

    handleQueryInput = event => this.setState({query : event.target.value})

    handleSearchSubmit = event => {
        event.preventDefault()
        const {state: {query}, props} = this
        props.history.push(`/results/${query}`)
        this.setState({query:null})
    }   

    render() {
        const {handleSearchSubmit,handleQueryInput} = this
        return (
            <section className="search">
                <form className="search__form" onSubmit={handleSearchSubmit}>
                <input className="search__form-input" type="text" placeholder="Search events..." onChange={handleQueryInput}  required />
                </form>
            </section>
        )
    }
}

export default withRouter(Search)
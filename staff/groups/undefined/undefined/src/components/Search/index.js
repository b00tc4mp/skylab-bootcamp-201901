import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class Search extends Component {
    state = { query: '' }

    componentDidMount() {
        const {match: {params: {query}}} = this.props
        if (query) this.setState({ query }, ()=>  this.getUrlQuery())
    }

    getUrlQuery = () => {
        const {query} = this.state
        this.props.onSearch(query)
    }
    
    handleSearchSubmit = (event) => {
        event.preventDefault()
        const {query} = this.state
        //this.props.history.push(`/search/${query}`)
        this.getUrlQuery()
        // const {query} = this.state
        // this.props.onSearch(query)
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
export default withRouter(Search)
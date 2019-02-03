import React, {Component} from 'react'

class Search extends Component {

    state = { query:'' }

    handleQueryInput = ({target : {value : query}}) => this.setState({query})
    
    handleSearchSubmit = event => {
        event.preventDefault()

        const{props:{onSearch}, state:{query}} = this

        onSearch(query)
    }

    render(){

        const{handleQueryInput, handleSearchSubmit} = this

        return <form className="search" onSubmit={handleSearchSubmit}>
        <input className="search__input" type="text" placeholder="Search" onChange={handleQueryInput}/>
        <button type="submit">Search</button>
        </form>
    }
}

export default Search
import React from 'react'

class Search extends React.Component {
    state = { query: '' }

    handleSearchInput = event => this.setState({ query: event.target.value })

    handleSubmit = event => {
        event.preventDefault()

        const { state: { query }, props: { onSearch } } = this

        onSearch(query)
    }

    render() {
        return <form onSubmit={this.handleSubmit} className="form-inline my-2 my-lg-0 row">
            <input onChange={this.handleSearchInput} className="form-control mr-sm-2 col-sm-8 col-12" type="search" name="query" placeholder="Search Artist..." aria-label="Search" />
            <button className="btn btn-outline-info my-2 my-sm-0 col-sm-3 col-12" type="submit">Search</button>
            {/* {this.props.feedback && <Feedback message={this.props.feedback} />} */}
        </form>
       
    }
}

export default Search

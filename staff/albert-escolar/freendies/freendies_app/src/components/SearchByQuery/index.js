import React, { Component } from 'react'
import './index.scss'
import logic from '../../logic';
import ListComponent from '../ListComponent'

class SearchByQuery extends Component {

    state = {
        results: null

    }

    async componentDidMount() {

        const { match: { params: { genre, query } } } = this.props

        const results = await logic.retrieveGameByQuery(genre, query)
        this.setState({ results })
    }

    async componentWillReceiveProps(props) {

        const { match: { params: { genre, query } } } = props

        const results = await logic.retrieveGameByQuery(genre, query)
        this.setState({ results })

    }

    render() {
        const { results } = this.state
        const { match: { params: { genre } } } = this.props


        return <div className="searchByQuery">
            <h2 className="searchByQuery__title">{genre} games</h2>

            {results && results.length ? <ListComponent results={results} /> : <div className="searchByQuery__noResult">no results found</div>}
        </div>

    }

}

export default SearchByQuery
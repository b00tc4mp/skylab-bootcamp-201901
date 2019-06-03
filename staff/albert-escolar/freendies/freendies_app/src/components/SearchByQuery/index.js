import React, { Component } from 'react'
import './index.scss'
import logic from '../../logic';
import ListComponent from '../ListComponent'

class SearchByQuery extends Component {

    state = {
        results: null

    }

    async componentDidMount() {
        debugger
        const { match: { params: { genre, query } } } = this.props

        const results = await logic.retrieveGameByQuery(genre, query)
        this.setState({results})
    }

   async componentWillReceiveProps(props) {
       debugger
        const { match: { params: { genre, query } } } = props

        const results = await logic.retrieveGameByQuery(genre, query)
        this.setState({results})

    }

    render() {
        const { results } = this.state

        return <div>
            {results && results.length ? <ListComponent results={results} /> : <div>No results</div>}
        </div>

    }

}

export default SearchByQuery
import React, { Component } from 'react'
import './index.scss'
import logic from '../../logic';
import ListComponent from '../ListComponent'

class SearchByGenre extends Component {
    state = {
        results: null
    }

    async componentDidMount() {
        const { match: { params: { genre } } } = this.props
        const results = await logic.retrieveGameByGenre(genre)
        this.setState({ results })
    }

    async componentWillReceiveProps(props) {
        const { match: { params: { genre } } } = props

        const results = await logic.retrieveGameByGenre(genre)
        this.setState({ results })
    }

    render() {
        const { results } = this.state

        return <div>
            <ListComponent results={results} />
        </div>
    }
}

export default SearchByGenre
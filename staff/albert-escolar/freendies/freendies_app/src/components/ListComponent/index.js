import React, { Component } from 'react'
import './index.scss'
import GameCard from '../GameCard'
class ListComponent extends Component {

    state = {
        results: null
    }

    componentDidMount() {
        const { results } = this.props
        this.setState({ results })
    }

    componentWillReceiveProps(props){
        const { results } = props
        this.setState({ results })
    }

    listResults = (results) => {

        return results.map(result => {
            return <GameCard id={result.id} title={result.title} genre={result.genre} image={result.images[0]} />
        })
    }

    render() {
        const { results } = this.state
        const { listResults } = this
        return <div>
            {results && listResults(results)}

        </div>

    }
}

export default ListComponent
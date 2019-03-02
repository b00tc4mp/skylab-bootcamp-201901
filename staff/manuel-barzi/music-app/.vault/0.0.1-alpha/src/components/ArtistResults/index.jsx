'use strict'

import React, { Component } from 'react'
import Results from '../Results'
import logic from '../../logic'

class ArtistResults extends Component {
    state = { artists: null, feedback: null }

    componentDidMount() {
        console.log('mounted')

        const { props: { query } } = this

        this.handleSearch(query)
    }

    componentWillReceiveProps(props) {
        console.log('props changed')
        
        const { query } = props

        this.handleSearch(query)
    }

    handleSearch = query => {
        try {
            logic.searchArtists(query)
                .then(artists => {
                    this.setState({
                        artists: artists.map(({ id, name: title }) => ({ id, title }))
                    })
                })
                .catch(({ message }) => this.setState({ feedback: message }))
        } catch ({ message }) {
            this.setState({ feedback: message })
        }
    }

    render() {
        const { state: { artists, feedback }, props: {onArtistSelected} } = this

        return <Results title="Artists" results={artists} feedback={feedback} onItemClick={onArtistSelected} />
    }
}

export default ArtistResults
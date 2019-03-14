'use strict'

import React, { Component } from 'react'
import Results from '../Results'
import logic from '../../logic'

class ArtistResults extends Component {
    state = { artists: null, feedback: null }

    componentDidMount() {
        const { props: { query } } = this

        this.query = query

        this.handleSearch(query)

        console.log(this, 'component did mount')
    }

    componentWillReceiveProps(props) {
        const { query } = props

        if (query !== this.query) {
            this.query = query

            this.handleSearch(query)
        }

        console.log(this, 'component will receive props')
    }

    handleSearch = query => {
        try {
            Promise.all([
                logic.searchArtists(query),
                logic.retrieveUser()
            ])
                .then(([artists, { favoriteArtists }]) =>
                    this.setState({
                        artists: artists.map(({ id, name: title }) => ({ id, title, isFavorite: favoriteArtists.includes(id) }))
                    })
                )
                .catch(({ message }) => this.setState({ feedback: message }))
        } catch ({ message }) {
            this.setState({ feedback: message })
        }
    }

    handleToggleFavorite = artistId => {
        try {
            logic.toggleFavoriteArtist(artistId)
                .then(() => {
                    const { props: { query } } = this

                    return this.handleSearch(query)
                })
                .catch(({ message }) => this.setState({ feedback: message }))
        } catch ({ message }) {
            this.setState({ feedback: message })
        }
    }

    render() {
        const { handleToggleFavorite, state: { artists, feedback }, props: { onArtistSelected } } = this

        return <Results title="Artists" results={artists} feedback={feedback} onItemClick={onArtistSelected} onToggleFavorite={handleToggleFavorite} />
    }
}

export default ArtistResults
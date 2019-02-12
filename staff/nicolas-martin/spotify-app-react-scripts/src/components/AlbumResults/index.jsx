'use strict'

import React, { Component } from 'react'
import Results from '../Results'
import logic from '../../logic'

class AlbumResults extends Component {
    state = { albums: null, feedback: null }

    componentDidMount() {
        const { props: { artistId } } = this

        this.handleArtistSelected(artistId)
    }

    componentWillReceiveProps(props) {
        const { artistId } = props

        this.handleArtistSelected(artistId)
    }

    handleArtistSelected = id => {
        try {
            logic.retrieveAlbums(id)
                .then(albums => {
                    this.setState({
                        albums: albums.map(({ id, name: title }) => ({ id, title }))
                    })
                })
                .catch(({ message }) => this.setState({ feedback: message }))
        } catch ({ message }) {
            this.setState({ feedback: message })
        }
    }

    render() {
        const { state: { albums, feedback }, props: { onAlbumSelected } } = this

        return <Results results={albums} feedback={feedback} onItemClick={onAlbumSelected} />
    }
}

export default AlbumResults
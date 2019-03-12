'use strict'

import React, { Component } from 'react'
import Results from '../Results'
import logic from '../../logic'

class AlbumResults extends Component {
    state = { artist: null, albums: null, feedback: null }

    componentDidMount() {
        const { props: { artistId } } = this

        this.artistId = artistId

        this.handleArtistSelected(artistId)

        console.log(this, 'component did mount')
    }

    componentWillReceiveProps(props) {
        const { artistId } = props

        if (artistId !== this.artistId) {
            this.artistId = artistId

            this.handleArtistSelected(artistId)
        }

        console.log(this, 'component will receive props')
    }

    handleArtistSelected = artistId => {
        try {
            Promise.all([
                logic.retrieveArtist(artistId),
                logic.retrieveAlbums(artistId)
            ])
                .then(([artist, albums]) => {
                    this.setState({
                        artist,
                        albums: albums.map(({ id, name: title }) => ({ id, title }))
                    })
                })
                .catch(({ message }) => this.setState({ feedback: message }))
        } catch ({ message }) {
            this.setState({ feedback: message })
        }
    }

    render() {
        const { state: { artist, albums, feedback }, props: { onAlbumSelected } } = this

        return artist ? <Results title={`${artist.name} (Albums)`} results={albums} feedback={feedback} onItemClick={onAlbumSelected} /> : null
    }
}

export default AlbumResults
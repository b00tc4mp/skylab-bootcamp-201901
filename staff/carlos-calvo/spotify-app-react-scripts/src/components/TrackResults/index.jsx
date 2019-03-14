'use strict'

import React, { Component } from 'react'
import Results from '../Results'
import logic from '../../logic'

class TrackResults extends Component {
    state = { album: null, tracks: null, feedback: null }

    componentDidMount() {
        const { props: { albumId } } = this

        this.handleAlbumSelected(albumId)
    }

    componentWillReceiveProps(props) {
        const { albumId } = props

        this.handleAlbumSelected(albumId)
    }

    handleAlbumSelected = albumId => {
        try {
            Promise.all([
                logic.retrieveAlbum(albumId),
                logic.retrieveTracks(albumId)
            ])
                .then(([album, tracks]) => {
                    debugger
                    this.setState({
                        album,
                        tracks: tracks.map(({ id, name: title }) => ({ id, title }))
                    })
                    debugger
                })
                .catch(({ message }) => this.setState({ feedback: message }))
        } catch ({ message }) {
            this.setState({ feedback: message })
        }
    }

    render() {
        const { state: { album, tracks, feedback }, props: { onTrackSelected } } = this

        return album? <Results title={`${album.name} (Tracks)`} results={tracks} feedback={feedback} onItemClick={onTrackSelected} /> : null
    }
}

export default TrackResults
'use strict'

import React, { Component } from 'react'
import Results from '../Results'
import logic from '../../logic'

class TrackResults extends Component {
    state = { tracks: null, feedback: null }

    componentDidMount() {
        const { props: { albumId } } = this

        this.handleAlbumSelected(albumId)
    }

    componentWillReceiveProps(props) {
        const { albumId } = props

        this.handleAlbumSelected(albumId)
    }

    handleAlbumSelected = id => {
        try {
            logic.retrieveTracks(id)
                .then(tracks => {
                    this.setState({
                        tracks: tracks.map(({ id, name: title }) => ({ id, title }))
                    })
                })
                .catch(({ message }) => this.setState({ feedback: message }))
        } catch ({ message }) {
            this.setState({ feedback: message })
        }
    }

    render() {
        const { state: { tracks, feedback }, props: { onTrackSelected } } = this

        return <Results results={tracks} feedback={feedback} onItemClick={onTrackSelected} />
    }
}

export default TrackResults
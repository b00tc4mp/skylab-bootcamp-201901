'use strict'

import React, { Component } from 'react'
import Player from '../Player'
import logic from '../../logic'

class TrackPlayer extends Component {
    state = { track: null, feedback: null }

    componentDidMount() {
        const { props: { trackId } } = this

        this.handleTrackSelected(trackId)
    }

    componentWillReceiveProps(props) {
        const { trackId } = props

        this.handleTrackSelected(trackId)
    }

    handleTrackSelected = id => {
        try {
            logic.retrieveTrack(id)
                .then(track => {
                    this.setState({
                        track: { title: track.name, url: track.preview_url }
                    })
                })
                .catch(({ message }) => this.setState({ feedback: message }))
        } catch ({ message }) {
            this.setState({ feedback: message })
        }
    }

    render() {
        const { state: { track, feedback } } = this

        return track && <Player track={track} feedback={feedback} />
    }
}

export default TrackPlayer
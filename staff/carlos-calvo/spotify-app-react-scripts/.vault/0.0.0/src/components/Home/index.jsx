'use strict'

import React, { Component } from 'react'
import Search from '../Search'
import Results from '../Results'
import Player from '../Player'
import i18n from '../../i18n'
import logic from '../../logic'

class Home extends Component {
    state = { artists: null, albums: null, tracks: null, track: null, searchFeedback: null, artistFeedback: null, albumFeedback: null, trackFeedback: null }

    handleSearch = query => {
        try {
            logic.searchArtists(query)
                .then(artists => {
                    this.setState({
                        artists: artists.map(({ id, name: title }) => ({ id, title })),
                        albums: null,
                        tracks: null
                    })
                })
                .catch(({ message }) => this.setState({ searchFeedback: message }))
        } catch ({ message }) {
            this.setState({ searchFeedback: message })
        }
    }

    handleArtistSelected = id => {
        try {
            logic.retrieveAlbums(id)
                .then(albums => {
                    this.setState({
                        albums: albums.map(({ id, name: title }) => ({ id, title })),
                        tracks: null
                    })
                })
                .catch(({ message }) => this.setState({ artistFeedback: message }))
        } catch ({ message }) {
            this.setState({ artistFeedback: message })
        }
    }

    handleAlbumSelected = id => {
        try {
            logic.retrieveTracks(id)
                .then(tracks => {
                    this.setState({
                        tracks: tracks.map(({ id, name: title }) => ({ id, title }))
                    })
                })
                .catch(({ message }) => this.setState({ albumFeedback: message }))
        } catch ({ message }) {
            this.setState({ albumFeedback: message })
        }
    }

    handleTrackSelected = id => {
        try {
            logic.retrieveTrack(id)
                .then(track => {
                    this.setState({
                        track: { title: track.name, url: track.preview_url }
                    })
                })
                .catch(({ message }) => this.setState({ trackFeedback: message }))
        } catch ({ message }) {
            this.setState({ trackFeedback: message })
        }
    }

    render() {
        const { handleSearch, handleArtistSelected, handleAlbumSelected, handleTrackSelected, state: { artists, albums, tracks, track, searchFeedback, artistFeedback, albumFeedback, trackFeedback }, props: { language } } = this

        return <section className="home">
            <Search title={i18n[language].searchTitle} onSearch={handleSearch} feedback={searchFeedback} />
            {artists && <Results title="Artists" results={artists} onItemClick={handleArtistSelected} feedback={artistFeedback} />}
            {albums && <Results title="Albums" results={albums} onItemClick={handleAlbumSelected} feedback={albumFeedback} />}
            {tracks && <Results title="Tracks" results={tracks} onItemClick={handleTrackSelected} feedback={trackFeedback} />}
            {track && <Player track={track} />}
        </section >
    }
}

export default Home
'use strict'

import React, { Component } from 'react'
import Search from '../Search'
import i18n from '../../i18n'
import { withRouter, Route } from 'react-router-dom'
import ArtistResults from '../ArtistResults'
import AlbumResults from '../AlbumResults'
import TrackResults from '../TrackResults'
import TrackPlayer from '../TrackPlayer'

class Home extends Component {
    state = { artists: null, albums: null, tracks: null, track: null, artistId: null, albumId: null, trackId: null, searchFeedback: null }

    handleSearch = query => {
        this.props.history.push(`/search/${query}`)
    }

    handleArtistSelected = id => {
        this.setState({
            artistId: id
        }, () => this.props.history.push(`/artist/${id}`))
    }

    handleAlbumSelected = id => {
        this.setState({
            albumId: id
        }, () => {
            const { state: { artistId } } = this

            this.props.history.push(`/artist/${artistId}/album/${id}`)
        })
    }

    handleTrackSelected = id => {
        this.setState({
            trackId: id
        }, () => {
            const { state: { artistId, albumId } } = this

            this.props.history.push(`/artist/${artistId}/album/${albumId}/track/${id}`)
        })
    }

    render() {
        const { handleSearch, handleArtistSelected, handleAlbumSelected, handleTrackSelected, state: { artists, albums, tracks, track, searchFeedback, artistFeedback, albumFeedback, trackFeedback }, props: { language } } = this

        return <section className="home">
            <Search title={i18n[language].searchTitle} onSearch={handleSearch} feedback={searchFeedback} />
            <Route path="/search/:query" render={props => <ArtistResults query={props.match.params.query} onArtistSelected={handleArtistSelected} />} />
            <Route path="/artist/:id" render={props => <AlbumResults artistId={props.match.params.id} onAlbumSelected={handleAlbumSelected} />} />
            <Route path="/artist/:artistId/album/:albumId" render={props => <TrackResults albumId={props.match.params.albumId} onTrackSelected={handleTrackSelected} />} />
            <Route path="/artist/:artistId/album/:albumId/track/:trackId" render={props => <TrackPlayer trackId={props.match.params.trackId} />} />
        </section >
    }
}

export default withRouter(Home)
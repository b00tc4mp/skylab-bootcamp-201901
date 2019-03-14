'use strict'

import React, { Component } from 'react'
import Search from '../Search'
import i18n from '../../i18n'
import { withRouter, Route } from 'react-router-dom'
import ArtistResults from '../ArtistResults'
import AlbumResults from '../AlbumResults'
import TrackResults from '../TrackResults'
import TrackPlayer from '../TrackPlayer'
import './index.sass'

class Home extends Component {
    state = { query: null, artistId: null, albumId: null, trackId: null, searchFeedback: null }

    handleSearch = query => {
        this.setState({ query }, () => this.props.history.push(`/search/${query}`))
    }

    handleArtistSelected = artistId => this.setState({ artistId }, () => {
        const { state: {query} } = this

        this.props.history.push(`/search/${query}/artist/${artistId}`)
    })

    handleAlbumSelected = albumId => {
        this.setState({ albumId }, () => {
            const { state: { query, artistId } } = this

            this.props.history.push(`/search/${query}/artist/${artistId}/album/${albumId}`)
        })
    }

    handleTrackSelected = trackId => {
        this.setState({ trackId }, () => {
            const { state: { query, artistId, albumId } } = this

            this.props.history.push(`/search/${query}/artist/${artistId}/album/${albumId}/track/${trackId}`)
        })
    }

    render() {
        const { handleSearch, handleArtistSelected, handleAlbumSelected, handleTrackSelected, state: { searchFeedback }, props: { language } } = this

        return <section className="home">
            <Search title={i18n[language].searchTitle} onSearch={handleSearch} feedback={searchFeedback} />
            <Route path="/search/:query" render={props => <ArtistResults query={props.match.params.query} onArtistSelected={handleArtistSelected} />} />
            <Route path="/search/:query/artist/:artistId" render={props => <AlbumResults artistId={props.match.params.artistId} onAlbumSelected={handleAlbumSelected} />} />
            <Route path="/search/:query/artist/:artistId/album/:albumId" render={props => <TrackResults albumId={props.match.params.albumId} onTrackSelected={handleTrackSelected} />} />
            <Route path="/search/:query/artist/:artistId/album/:albumId/track/:trackId" render={props => <TrackPlayer trackId={props.match.params.trackId} />} />
        </section >
    }
}

export default withRouter(Home)
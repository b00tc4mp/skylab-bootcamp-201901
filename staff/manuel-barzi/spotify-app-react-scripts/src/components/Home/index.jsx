'use strict'

class Home extends React.Component {
    state = { artists: null, albums: null, tracks: null, track: null, searchFeedback: null, artistFeedback: null, albumFeedback: null, trackFeedback: null }

    handleSearch = query => logic.searchArtists(query, (error, artists) => {
        if (error) this.setState({ searchFeedback: error.message })
        else this.setState({
            artists: artists.map(({ id, name: title }) => ({ id, title })),
            albums: null,
            tracks: null
        })
    })

    handleArtistSelected = id => logic.retrieveAlbums(id, (error, albums) => {
        if (error) this.setState({ artistFeedback: error.message })
        else this.setState({
            albums: albums.map(({ id, name: title }) => ({ id, title })),
            tracks: null
        })
    })

    handleAlbumSelected = id => logic.retrieveTracks(id, (error, tracks) => {
        if (error) this.setState({ albumFeedback: error.message })
        else this.setState({
            tracks: tracks.map(({ id, name: title }) => ({ id, title }))
        })
    })

    handleTrackSelected = id => logic.retrieveTrack(id, (error, track) => {
        if (error) this.setState({ trackFeedback: error.message })
        else this.setState({
            track: { title: track.name, url: track.preview_url }
        })
    })

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
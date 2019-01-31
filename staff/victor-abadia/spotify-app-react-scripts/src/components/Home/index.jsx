'use strict'

class Home extends React.Component {
    state = { artists: null, albums: null, songs: null, artistVisible: false, albumsVisible: false, songsVisible: false }

    handleSearch = query => logic.searchArtists(query, (error, artists) => {
        if (error) console.error(error)
        else this.setState({ artistVisible: true, albumsVisible: false, songsVisible: false, artists: artists.map(({ id, name, images }) => ({ id, name, images })) })

    })

    handleArtistSelected = id => logic.retrieveAlbums(id, (error, albums) => {
        if (error) console.error(error)
        else this.setState({
            artistVisible: false, albumsVisible: true, songsVisible: false,
            albums: albums.map(({ id, name, images }) => ({ id, name, images }))
        })
    })

    handleAlbumSelected = id => logic.retrieveTracks(id, (error, tracks) => {
        console.log(tracks)
        if (error) console.error(error)
        else this.setState({
            artistVisible: false, albumsVisible: false, songsVisible: true,
            songs: tracks.map(({ name, preview_url }) => ({ name, preview_url }))
        })
    })

    render() {
        return <section className="home container">
            <Search onSearch={this.handleSearch} />
            {this.state.artistVisible && this.state.artists && <Results results={this.state.artists} onItemClick={this.handleArtistSelected} />}
            {this.state.albumsVisible && this.state.albums && <Results results={this.state.albums} onItemClick={this.handleAlbumSelected} />}
            {this.state.songsVisible && this.state.songs && <Songs results={this.state.songs} />}
        </section>
    }
}
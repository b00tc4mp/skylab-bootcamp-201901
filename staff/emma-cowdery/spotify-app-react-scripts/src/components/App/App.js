import React, { Component } from 'react';
import './App.sass';
import logic from '../../logic'
import Login from '../Login'
import Welcome from '../Welcome'
import Register from '../Register'
import Artist from '../Artist'
import Albums from '../Albums'
import Tracks from '../Tracks'
import spotifyApi from '../../spotify-api-1.0.0'

spotifyApi.token = 'BQDWMZ-ubrW8r-eqbU5qlO0OplQJ_t-VQBNpzY15KoDTrvap6hhVDkeI32maDJjwQDdbaMDqqMRhgaNMigAiOzSsIbOQB7lQwDU7REJAj6yTrea_x1vrpSHP7uD8sTRS1EOF_FbV2JLa'

class App extends Component {
    state = { artists: [], albums: [], tracks: [], track: {}, image: '', loginFeedback: '', name: '', welcomeVisual: false, registerVisual: false, loginVisual: true, artistsVisual: false, albumsVisual: false, tracksVisual: false, trackVisual: false}

    handleLogin = (email, password) => {
        try {
            logic.login(email, password, user => {
                console.log(user)
                this.setState({ loginFeedback: '', welcomeVisual: true, loginVisual: false, name: user.name })
            })
        } catch ({ message }) {
            this.setState({ loginFeedback: message })
        }
    }

    handleRegister = (name, surname, email, password, passwordConfirmation) => {
        try {

            logic.register(name, surname, email, password, passwordConfirmation, () => {

                this.setState({ registerFeedback: '', registerVisual: false, loginVisual: true })
            })
        } catch ({ message }) {
            //console.error(error)
            // this.setState({ loginFeedback: message })
        }
    }

    handleSearch = (query) => {
        try {
            logic.searchArtists(query, (error, artists) => {
                console.log(artists)
                this.setState({ artists, registerFeedback: '', artistsVisual: true, albumsVisual: false, tracksVisual: false, trackVisual: false })
            })
        } catch ({ message }) {
            this.setState({ registerFeedback: message })
        }
    }

    handleToAlbums = (id) => {
        try {
            logic.retrieveAlbums(id, (error, albums) => {
                console.log(albums)
                this.setState({ albums, registerFeedback: '', artistsVisual: false, albumsVisual: true })
            })
        } catch ({ message }) {
            this.setState({ registerFeedback: message })
        }
    }

    handleToTracks = (id, image) => {
        try {
            logic.retrieveTracks(id, (error, tracks) => {
                this.setState({ tracks, registerFeedback: '', albumsVisual: false, tracksVisual: true, image })
            })
        } catch ({ message }) {
            this.setState({ registerFeedback: message })
        }
    }

    handleToTrack = (id) => {
        try {
            logic.retrieveTrack(id, (error, track) => {
                console.log(track)
                this.setState({ track, registerFeedback: '', trackVisual: true })
            })
        } catch ({ message }) {
            this.setState({ registerFeedback: message })
        }
    }

    // handleFavourited = () => {

    // }

    handleGoToRegister = () => {
        this.setState({ registerVisual: true, loginVisual: false, artistsVisual: false, albumsVisual: false, tracksVisual: false, trackVisual: false })
    }

    handleToLogin = () => {
        this.setState({ registerVisual: false, loginVisual: true, artistsVisual: false, albumsVisual: false, tracksVisual: false, trackVisual: false })
    }

    handleButtonToArtists = () => {
        this.setState({ artistsVisual: true, albumsVisual: false, tracksVisual: false, trackVisual: false })
    }

    handleButtonToAlbums = () => {
        this.setState({ albumsVisual: true, tracksVisual: false, trackVisual: false })
    }

    handleLogout = () => {
        this.setState({ welcomeVisual: false, loginVisual: true, artistsVisual: false, albumsVisual: false, tracksVisual: false, trackVisual: false, name: '' })
    }



    render() {
        const { state: { loginFeedback, loginVisual, welcomeVisual, registerVisual, artistsVisual, albumsVisual, tracksVisual }, handleLogin, handleLogout, handleRegister, handleSearch, handleToAlbums, handleToTracks, handleToTrack, handleButtonToArtists, handleButtonToAlbums } = this

        return <main className="app">
            <header>
                <nav className="navbar navigation is-fixed-top" role="navigation" aria-label="main navigation">
                    <div className="navbar-brand">
                        <h1 className="navbar-item"><i className="fas fa-headphones"></i> Spotify App</h1>
                    </div>
                    <div className="navbar-menu">
                        <div className="navbar-end">
                            <div className="navbar-item has-dropdown is-hoverable">
                                <span className="navbar-link">{this.state.name ? <p className="userIcon">{this.state.name[0]}</p> : <i className="fas fa-user"></i>}</span>
                                <div className="navbar-dropdown">
                                <p className="navbar-item" onClick={handleLogout}>Log out</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
            {loginVisual && <Login onLogin={handleLogin} feedback={loginFeedback} goToRegister={this.handleGoToRegister} />}
            {welcomeVisual && <Welcome onSearch={handleSearch} name={this.state.name} />}
            {registerVisual && <Register onRegister={handleRegister} backToLogin={this.handleToLogin} />}
            {artistsVisual && <Artist handleArtistId={handleToAlbums} artistsList={this.state.artists} />}
            {albumsVisual && <Albums albumsList={this.state.albums} handleAlbumId={handleToTracks} toArtists={handleButtonToArtists} />}
            {tracksVisual && <Tracks tracksList={this.state.tracks} albumCover={this.state.image} handleTracksId={handleToTrack} toArtists={handleButtonToArtists} toAlbums={handleButtonToAlbums} track={this.state.track} onAddFavourite={this.handleFavourited}/>}
        </main>
    }
}

export default App;

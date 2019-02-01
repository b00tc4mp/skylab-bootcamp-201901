import React from 'react'

import Home from '../Home'
import Login from '../Login'
import Nav from '../Nav'
import NavResults from '../NavResults'
import Albums from '../Albums'
import Artists from '../Artists'
import NetworkFeedback from '../NetworkFeedback'
import Play from '../Play'
import Tracks from '../Tracks'
import Register from '../Register'

import logic from '../../logic'
import spotifyApi from '../../spotify-api'
// import ../..
import '../../index.sass'


class App extends React.Component {
    state = { registerVisual: false, userFavorite:[], favoriteIsMarked: false, userMail: '', networkFeedbackVisual: false, searchFeedback:'', artistsVisual: false, albumsVisual: false, homeVisual: false, tracksVisual: false, songVisual: false, loginVisual: true, logoutButtonVisual: false, artistVisual: false, searchNavVisual: false, navResultsVisual: false, albumImage: '', albumButtonVisual: false, trackButtonVisual: false }

    handleLogin = (email, password) => {

        try {
            logic.login(email, password, user => {

                this.setState({userMail:user.email, homeVisual: true, loginVisual: false, logoutButtonVisual: true, loginFeedback: '' })

            })
        } catch ({ message }) {
            this.setState({ loginFeedback: message })
        }

    }

    handleRegister = (name, surname, email, password, confirmPasword) => {

        try {
            // logic.register((name, surname, email, password, confirmPasword, () => {

            //     this.setState({homeVisual: false, loginVisual: true, logoutButtonVisual: false, loginFeedback: '' })

            // })
            console.log(name, surname, email, password, confirmPasword)
        } catch (err) {
            console.error( err)
        }

    }

    handleLogout = () => {
        this.setState({ networkFeedbackVisual: false, homeVisual: false, navResultsVisual: false, searchNavVisual: false, logoutButtonVisual: false, loginVisual: true, albumButtonVisual: false, trackButtonVisual: false,artistsVisual: false, albumsVisual: false, tracksVisual: false, songVisual: false })

    }


    handleLogintoRegister = () => {
        this.setState({ loginVisual: false, registerVisual: true })
    }

    handleRegistertoLogin = () => {
        this.setState({ loginVisual: true, registerVisual: false })
    }

    handleSearchHome = query => {
        try {
            logic.searchArtists(query, (error, artists) => {
                if(error){
                    this.setState( {networkFeedbackVisual: true, homeVisual: false})
                }else{
                    this.setState({ networkFeedbackVisual:false, homeVisual: false, artists: artists, artistsVisual: true, searchNavVisual: true, navResultsVisual: true })
                }
            })
        } catch ({message}) {
            this.setState({ searchFeedback: message })
        }
    }

    handleSearchNav = query => {
        try {
            logic.searchArtists(query, (error, artists) => {
                if(error){
                    this.setState( {networkFeedbackVisual: true, homeVisual: false, artistsVisual: false, albumsVisual: false, tracksVisual: false, songVisual: false, searchNavVisual: false, navResultsVisual: false})
                }else{
                this.setState({ artists, artistsVisual: true, albumsVisual: false, tracksVisual: false, songVisual: false, albumButtonVisual: false, trackButtonVisual: false })
                }
            })
        } catch ({message}) {
            this.setState({ searchFeedback: message })
        }
    }

    handleArtistButton = () => {
        this.setState({ albumsVisual: false, artistsVisual: true, tracksVisual: false, songVisual: false, albumButtonVisual: false, trackButtonVisual: false })
    }

    handleAlbumButton = () => {
        this.setState({ albumsVisual: true, artistsVisual: false, tracksVisual: false, songVisual: false, albumButtonVisual: true, trackButtonVisual: false })
    }


    handleArtistId = (id) => {
        try {
            logic.retrieveAlbums(id, (error, albums) => {
                this.setState({ albums, albumsVisual: true, artistsVisual: false, tracksVisual: false, songVisual: false, albumButtonVisual: true })

            })
        } catch (error) {
            console.error(error)
        }

    }

    handleAlbumId = (id, albumImage) => {

        try {
            logic.retrieveTracks(id, (error, tracks) => {
                this.setState({ tracks, albumsVisual: false, artistsVisual: false, tracksVisual: true, songVisual: false, albumImage, albumButtonVisual: true, trackButtonVisual: true })

            })
        } catch (error) {
            console.error(error)
        }

    }

    handleTrackId = (id) => {
        try {
            logic.retrieveSong(id, (error, song) => {
                this.setState({ song, albumsVisual: false, artistsVisual: false, tracksVisual: true, songVisual: true, favoriteIsMarked: false })

            })

        } catch (error) {
            console.error(error)
        }
    }

    handleGetToken = (token) => {
        this.setState({ networkFeedbackVisual:false, homeVisual: true})
        spotifyApi.token = token       
    }

    handleFavorite= (trackId) => {
        const {state: {userMail}} =this
        logic.toggleFavorite(trackId, userMail, userFavorite=>{
            console.log('favorites',userFavorite)
            this.setState({userFavorite})
        })

    }

    render() {
        return <main className="app">
            <Nav logoutButtonVisual={this.state.logoutButtonVisual} searchNavVisual={this.state.searchNavVisual} onLogout={this.handleLogout} onSearch={this.handleSearchNav} feedback={this.state.searchFeedback} />
            {this.state.navResultsVisual && < NavResults artistButton={this.handleArtistButton} albumButton={this.handleAlbumButton} albumButtonVisual={this.state.albumButtonVisual} trackButtonVisual={this.state.trackButtonVisual} />}
            {this.state.loginVisual && <Login onLogin={this.handleLogin} loginToRegister={this.handleLogintoRegister} feedback={this.state.loginFeedback} />}
            {this.state.registerVisual && <Register onRegister={this.handleRegister} registerToLogin={this.handleRegistertoLogin} />}
            {this.state.homeVisual && < Home onSearch={this.handleSearchHome} feedback={this.state.searchFeedback} />}
            {this.state.networkFeedbackVisual && <NetworkFeedback getToken={this.handleGetToken} />}
            {this.state.artistsVisual && < Artists getArtistId={this.handleArtistId} artists={this.state.artists} />}
            {this.state.albumsVisual && < Albums getAlbumId={this.handleAlbumId} albums={this.state.albums} />}
            {this.state.songVisual && < Play song={this.state.song} favorite={this.handleFavorite} userFavorite={this.state.userFavorite} />}
            {this.state.tracksVisual && < Tracks getTrackId={this.handleTrackId} tracks={this.state.tracks} image={this.state.albumImage} />}

        </main>
    }
}

export default App;

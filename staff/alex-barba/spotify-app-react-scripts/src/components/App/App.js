import React, { Component } from 'react';
import logic from '../../logic';
import Banner from '../Banner';
import Login from '../Login';
import Search from '../Search';
import Artist from '../Artist';
import Album from '../Album';
import Tracks from '../Tracks';
import Track from '../Track';
import ModalRegistration from '../ModalRegistration';
import Favourite from '../Favourite';
import Register from '../Register';

class App extends Component {
  
  state = {loginFeedback: '', registrationFeedback: '', searchFeedback: '', registerVisible: false, loginVisible: true, homeVisible: false, artistVisible: false , albumVisible: false, tracksVisible: false, trackVisible: false, modalVisible: false, favouritesVisible: false,user:'', userEmail:'', userFavourites: [], artists: [] ,albums: [], tracks: [], track: {}, resultFavourite: false}

  handleLogin = (email, password) =>{
      try {
          logic.login(email, password, (user) => {
              this.setState({loginFeedback: '', loginVisible: false, searchVisible: true, user: user.name, userEmail: user.email, userFavourites: user.favourites})
          })
      } catch ({message}) {
          this.setState({ loginFeedback: message })
      }
  }

  handleRegistration = (name, surname, email, password, passwordConfirmation) => {
      this.setState ({registrationFeedback: ''})
      try {
          logic.register(name, surname, email, password, passwordConfirmation, () => {
              this.setState({modalVisible: true})
          })
      } catch ({message}) {
          this.setState ({registrationFeedback: message})
      }
  }

  handleSearch = (query, searchFeedback) => {
      this.setState({searchFeedback})
      try {
          logic.searchArtists(query, (error, artists) => {
              if (error) this.setState({searchFeedback: error})
              else {
                  this.setState({searchFeedback:'' ,artistVisible: true, artists})
              }
          })
      } catch ({message}) {
          this.setState({searchFeedback: message})
      }
  }

  handleAlbum = (artistId, searchFeedback) => {
      this.setState({searchFeedback})
      try {
          logic.retrieveAlbums(artistId, (error, albums) => {
              if (error) this.setState({searchFeedback: error})
              else {
                  this.setState({artistVisible: false, albumVisible: true, albums})
              }
          })
      } catch (message) {
          this.setState({searchFeedback: message})
      }
  }

  handleTracks = (albumId, searchFeedback) => {
      this.setState({searchFeedback})
      try {
          logic.retrieveTracks(albumId, (error, tracks) => {
              if (error) this.setState({searchFeedback: error})
              else {
                  this.setState({albumVisible: false, tracksVisible:true, tracks})
              }
          })
      } catch (message) {
          this.setState({searchFeedback: message})
      }
  }

  handleTrack = (trackId, searchFeedback) => {
      this.setState({searchFeedback})
      try {
          logic.retrieveTrack(trackId, (error, track) => {
              if (error) this.setState({searchFeedback: error})
              else {
                  this.setState({tracksVisible: false, favouritesVisible: false, trackVisible: true, searchVisible: true, track})
              }
          })
      } catch (message) {
          this.setState({searchFeedback: message})
      }
  }

  handleToLogout = () => {
      this.setState({query: '', loginFeedback: '', registrationFeedback: '', searchVisible: false, artistVisible: false, albumVisible: false, tracksVisible: false, trackVisible: false, registerVisible: false, loginVisible: true, favouritesVisible: false})
  }

  handleCloseModal = () => {
       this.setState({modalVisible: false,registrationFeeback: '',loginVisible: true, registerVisible: false })
  }

  handleToArtists = () => {
      this.setState({albumVisible: false, artistVisible: true, searchVisible: true})
  }

  handleToAlbums = () => {
      this.setState({albumVisible: true, tracksVisible: false})
  }

  handleToTracks = () => {
      this.setState({trackVisible: false, tracksVisible: true, resultFavourite: false})
  }

  handleLoginToRegister= () => {
      this.setState({registerVisible : true, loginVisible : false})
  }

  handleRegisterToLogin = () => {
      this.setState({registerVisible : false, loginVisible : true})
  }

  handleFavourites = (id, name,) => { 
      const {state:{userEmail}}= this
      console.log(this.state.userFavourites)

      var result = logic.retrieveFavourites(id, name, userEmail, (userFavourites) => {
          
          this.setState({userFavourites})
      })
      
      this.setState({resultFavourite : result})

      console.log(this.state.userFavourites)
      console.log(this.state.resultFavourite)
  }

  handleToSearch = () => {
      this.setState({favouritesVisible: false, searchVisible: true})
  }

  onFavourites = () => {
      this.setState({searchVisible : false, loginVisible : false, registerVisible: false, artistVisible: false, albumVisible: false, tracksVisible: false, trackVisible: false, favouritesVisible: true})
  }

  render() {
      const { state: { searchFeedback, loginFeedback, registrationFeedback, registerVisible, loginVisible, searchVisible, artistVisible, albumVisible, tracksVisible, trackVisible, modalVisible, favouritesVisible, artists, user, albums, tracks, track, resultFavourite, userFavourites}, handleLogin, handleRegistration, handleLoginToRegister, handleRegisterToLogin, handleSearch, handleAlbum, handleTracks, handleTrack, handleToLogout, handleToArtists, handleToAlbums, handleToTracks, handleCloseModal, handleFavourites, onFavourites, handleToSearch  } = this

      return <main>
      <Banner />
      {loginVisible && <Login onLogin={handleLogin} feedback={loginFeedback} onToRegister={handleLoginToRegister}/>}
      {registerVisible && <Register onRegistration={handleRegistration} feedback={registrationFeedback} onToLogin={handleRegisterToLogin}/>}
      {searchVisible && <Search onToSearch={handleSearch} feedback={searchFeedback} user={user} onToLogout={handleToLogout} onToFavourites={onFavourites}/>}
      {artistVisible && <Artist artists={artists} onArtist={handleAlbum} />}
      {albumVisible && <Album albums={albums} onAlbum={handleTracks} onToArtists={handleToArtists}/>}
      {tracksVisible && <Tracks tracks={tracks} onTrack={handleTrack} onToAlbums={handleToAlbums} />}
      {trackVisible && <Track track={track} onToTracks={handleToTracks} onFavourite={handleFavourites} resultFavourite={resultFavourite} userFavourites={userFavourites}/>}
      {modalVisible && <ModalRegistration closeModal={handleCloseModal} />}
      {favouritesVisible && <Favourite track={track} userFavourites={userFavourites} onToSearch={handleToSearch} onTrack={handleTrack}/> }
  </main>
      
  }
}

export default App;

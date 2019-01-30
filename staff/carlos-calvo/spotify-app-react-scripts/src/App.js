import React, { Component } from 'react';
import './App.css';
import Feedback from '../src/components/Feedback';
import AlbumPanel from '../src/components/AlbumPanel';
import ArtistPanel from '../src/components/ArtistPanel';
import AudioPanel from '../src/components/AudioPanel';
import BotonRegister from '../src/components/BotonRegister';
import HomePanel from '../src/components/HomePanel';
import Login from '../src/components/Login';
import RegisterSection from '../src/components/RegisterSection';
import TrackListPanel from '../src/components/TrackListPanel';
import logic from '../src/logic/logic.js';

import '../src/App.sass'


class App extends React.Component{
    
  state = {loginVisible: true,
      registerVisible: false, 
      homePanelVisible: false, 
      artistPanelVisible: false, 
      albumPanelVisible: false, 
      trackListPanelVisible: false, 
      email:'',
      trackId: '', 
      previewurl: '', 
      loginFeedback: '',
      registerfeedback: '', 
      artistResults: [], 
      audioPanelVisible: false,
      albumResults:[], 
      trackListResults:[], 
      artistSelected:'' }

  handleLogin = (email, password) => {
      try{
          logic.login(email, password, () =>{
              this.setState({email})
              this.setState({loginFeedback: ''})
              this.setState({loginVisible: false})
              this.setState({registerVisible: false})
              this.setState({homePanelVisible: true})
          })
      } catch ({message}){
          //parte de error de panel
          this.setState({ loginFeedback: message })
      }
  }

  goToRegisterForm = () =>{
      this.setState({loginVisible: false})
      this.setState({registerVisible: true})

  }

  doRegister = (name, surname, email, password, passwordconf) =>{
      //logic
      try{
          logic.register(name, surname, email, password, passwordconf, () => {
              this.setState({loginVisible: true})
              this.setState({loginFeedback: ''})
              this.setState({registerVisible: false})
              this.setState({registerfeedback: ''})
          })
          
      } catch({message}){
          this.setState({ registerfeedback: message })
      }
  }

  backToLogin = () =>{
      this.setState({registerVisible: false})
      this.setState({loginVisible: true})
      this.setState({homePanelVisible: false, artistPanelVisible: false, albumPanelVisible: false, trackListPanelVisible: false, audioPanelVisible: false})
  }


  goSearch = query =>{
      try{
          logic.searchArtists(query, (error, artistResults) => {
              if (error){
                  //Show result bad
                  console.log('No results modafoca')
              } 
              else {
                  this.setState({artistResults})
                  this.setState({artistPanelVisible: true})
                  this.setState({albumPanelVisible: false})
                  this.setState({trackListPanelVisible: false})
                  this.setState({audioPanelVisible: false})

              }
          })
      } catch({message}){
          this.setState({ loginFeedback: message })
      }
  }


  loadAlbumfromArtist = id => {
      try {
          console.log(id)
          logic.retrieveAlbums(id, (error, albumResults) => {
              if(error){
                  console.log(error.message)
              } else {
                  this.setState({albumResults})
                  console.log(albumResults)
                  this.setState({albumPanelVisible: true})
                  this.setState({trackListPanelVisible: false})
                  this.setState({audioPanelVisible: false})
                  window.scrollTo(0,document.body.scrollHeight);
              }
          })
      } catch (error) {
          console.log(error.message)
      }

  }


  loadTracksfromAlbum = id =>{
      try{
          console.log(id)
          logic.retrieveSongs(id, (error, trackListResults) => {
              if(error){
                  console.log(error.message)
                  console.log('no result modafoca')
              } else {
                  this.setState({trackListResults})
                  console.log(trackListResults)
                  this.setState({trackListPanelVisible: true})
                  this.setState({audioPanelVisible: true})
                  window.scrollTo(0,document.body.scrollHeight);
              }
          })
      } catch(error){
          console.log(error.message)
      }
  }


  loadTrack = (trackId, previewurl) =>{
      try{
          this.setState({ trackId })
          this.setState({ previewurl })
          this.setState({ audioPanelVisible: true })
          window.scrollTo(0,document.body.scrollHeight);
      } catch(error){
      }
  }


  AppToggleFavorite = (id) =>{
      try{
          logic.toggleFavorite(this.state.email, id)
      } catch(error){
          console.log(error)
      }
  }

  //{feedback && <Feedback message={feedback} level="warn" />}

  render(){
      const { state: {loginVisible, email, registerVisible, loginFeedback, homePanelVisible, artistPanelVisible, albumPanelVisible,  artistResults, albumResults, trackListPanelVisible, trackListResults, audioPanelVisible, previewurl, trackId, registerfeedback} , handleLogin, goToRegisterForm, doRegister, backToLogin, goSearch, loadAlbumfromArtist, loadTracksfromAlbum, loadTrack, AppToggleFavorite } = this
      return <main className="App">
          {loginVisible && <Login className="Login" onLogin={handleLogin} feedback={loginFeedback} /> }
          {loginVisible && <BotonRegister onRegister={goToRegisterForm} />}
          {registerVisible && <RegisterSection onRegisterUser = {doRegister} fromRegisterToLogin ={backToLogin} feedbackRegister = {registerfeedback}/>}
          {homePanelVisible && <HomePanel onSearchApp={goSearch} onLogout={backToLogin} artistResults = {this.state.artistResults}/>}
          {artistPanelVisible && <ArtistPanel artistResults = {artistResults} artistSelect = {loadAlbumfromArtist}/>}
          {albumPanelVisible && <AlbumPanel albumResults = {albumResults} albumSelected = {loadTracksfromAlbum}/>}
          {trackListPanelVisible && <TrackListPanel trackListResults = {trackListResults} trackSelected={loadTrack}/>}
          {audioPanelVisible && <AudioPanel previewurl = {previewurl} trackId={trackId} toggleFavorite = {AppToggleFavorite}/>}
      </main>
  }
  
}

export default App;

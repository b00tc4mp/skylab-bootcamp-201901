import React, {Component} from 'react'
import Header from '../Header'
import Results from '../Results'
import Player from '../Player'
import Profile from '../Profile'
import Preferences from '../Preferences'
import logic from '../../logic'

class Home extends Component {
    state = {error: null, musicList: [], playerUrl: null}

    handleSearchMusic = weather => {
        logic.searchMusicPreferences(this.props.user.preferences, weather)
        .then(musicList =>{
            this.setState({musicList})
        })
    }

    handlePlayMusic = url =>{
        
        this.setState({playerUrl: url})
    
    }
    render(){
        const {
            props: {onLogout, user, onProfile, onPreferences},
            state: {musicList, playerUrl},
            handleSearchMusic,
            handlePlayMusic
        }=this
        return <>
        <main className="home">
        <h1>weatunes</h1>
        <button onClick={onLogout}>Logout</button>
        <button onClick={onProfile}>Profile</button>
        <button onClick={onPreferences}>Preferences</button>

        {user && <Header city={user.city} preferences={user.preferences} onWeatherRetrieved={handleSearchMusic}/>}
        <Results items={musicList} onPlayer={handlePlayMusic}/>
        {playerUrl && <Player url={playerUrl}/>}
        
        </main>
        </>
    }
}

export default Home
import React, {Component} from 'react'
import Header from '../Header'
import Results from '../Results'
import Player from '../Player'
import Toast from '../Toast'
import logic from '../../logic'

class Home extends Component {
    state = {error: null, musicList: [], playerUrl: null}

    handleSearchMusic = weather => {
        logic.searchMusicPreferences(this.props.user.preferences, weather)
        .then(musicList =>{
            this.setState({musicList})
        })
        .catch(error =>
            this.setState({ error: error.message })
        )
    }

    handlePlayMusic = url =>{
        
        this.setState({playerUrl: url})
    
    }
    render(){
        const {
            props: {onLogout, user, onProfile, onPreferences},
            state: {musicList, playerUrl, error},
            handleSearchMusic,
            handlePlayMusic
        }=this
        return <>
        <main className="home">
        {user && <Header city={user.city} preferences={user.preferences} onWeatherRetrieved={handleSearchMusic} onLogout={onLogout} onProfile={onProfile} onPreferences={onPreferences}/>}
        {error && <Toast error={error}/>}
        <Results items={musicList} onPlayer={handlePlayMusic} error={error}/>
        {<Player url={playerUrl}/>}
        
        </main>
        </>
    }
}

export default Home
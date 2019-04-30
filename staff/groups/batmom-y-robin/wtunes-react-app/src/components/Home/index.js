import React, {Component} from 'react'
import Header from '../Header'
import Results from '../Results'
import Player from '../Player'
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
        debugger
        this.setState({playerUrl: url})
        console.log(url)
    }

    render(){
        const {
            props: {onLogout, user},
            state: {musicList, playerUrl},
            handleSearchMusic,
            handlePlayMusic
        }=this
        return <main className="home">
        <h1>weatunes</h1>
        <button onClick={onLogout}>Logout</button>
        {user && <Header city={user.city} preferences={user.preferences} onWeatherRetrieved={handleSearchMusic}/>}
        <Results items={musicList} onPlayer={handlePlayMusic}/>
        {playerUrl && <Player url={playerUrl}/>}

        </main>
    }
}

export default Home
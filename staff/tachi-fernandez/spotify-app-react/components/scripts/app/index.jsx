spotifyApi.token = 'BQD_-fyu21VU9an79tG51D0ei1N5POp4pKxizeQ6hwrZylK3Z8ORIeH1AeAlxdMhMXTmQ5mcHNEh3Sdkw7vcgb9nmHKtaYfH8u06HUEMFIuuiWDIxZreRhjrqOtcFvWacePBivZrPoq1nQXZNTs'

class App extends React.Component {

    state = {
        loginFeedback: '',
        registerFeedback: '',
        searchFeedback: '', albumsFeedback: '',tracksFeedback: '',trackFeedback:'', loginVisible: true, registerVisible: false, searchVisible: false, artistVisible: false,tracksVisible : false, trackVisible : false,  artist: null, albumsVisible: false, albums: null, tracks: null, track:null
    }
    handleLogin = (email, password) => {

        try {
            logic.login(email, password, user => {
                console.log(user)
                this.setState({ loginFeedback: '' })
                this.setState({ loginVisible: false, searchVisible: true })
            })
        } catch ({ message }) {
            this.setState({ loginFeedback: message })
        }
    }

    handleRegister = (name, surname, email, password, confirmPassword) => {

        try {
            logic.register(name, surname, email, password, confirmPassword, user => {
                console.log(user)
                this.setState({ registerFeedback: '' })
            })
        } catch ({ message }) {
            this.setState({ registerFeedback: message })
        }
    }

    handleSearch = (query) => {
        try {
            logic.searchArtists(query, (error, artist) => {
                console.log(artist)

                this.setState({ artist })
                this.setState({ searchFeedback: '' })
                this.setState({ artistVisible: true, loginVisible: false, searchVisible: true })
            })

        } catch ({ message }) {
            this.setState({ searchFeedback: message })

        }
    }

    handleAlbums = (artistId) => {
        try{
            console.log(artistId);
            logic.retrieveAlbums(artistId, (error,albums) =>{
                error;
                console.log(albums)

                this.setState({albums})
                this.setState({albumsFeedback:''})
                this.setState({artistVisible:false , albumsVisible: true})
            })
        }catch({message}){
            this.setState({albumsFeedback: message})
        }
    }

    handleTracks = (albumId) => {
        try{
            console.log(albumId)
            logic.retrieveTracks(albumId , (error,tracks) =>{
                console.log(tracks)

                this.setState({tracks})
                this.setState({tracksFeedback:''})
                this.setState({albumsVisible:false , tracksVisible: true})
            })

        }catch({message}){
            this.setState({tracksFeedback: message})
        }
    }

    handleTrack = (tracksId) => {
        try{
            console.log(tracksId)
            logic.retrieveTrack(tracksId , (error,track) =>{
                console.log(track)

                this.setState({track})
                this.setState({trackFeedback:''})
                this.setState({tracksVisible:false , trackVisible: true})
            })

        }catch({message}){
            this.setState({trackFeedback: message})
        }
    }



    onGoToAlbums = () => this.setState({artistVisible:false,albumsVisible:true})
    onGoToRegister = () => this.setState({ loginVisible: false, registerVisible: true })
    onGoToLogin = () => this.setState({ loginVisible: true, registerVisible: false })
    onLogout = () => this.setState({ loginVisible: true, searchVisible: false, artistVisible: false,albumsVisible:false,tracksVisible:false ,searchFeedback: '' })
    onBackToArtist = () => this.setState({albumsVisible: false , artistVisible: true})
    onBackToAlbums = () => this.setState({tracksVisible: false , albumsVisible:true})
    onBackToTracks = () => this.setState({trackVisible: false , tracksVisible:true})



    render() {
        const { handleLogin, handleRegister, handleSearch, onLogout, onGoToRegister, onGoToLogin,handleAlbums,onBackToArtist,handleTracks,onBackToAlbums,handleTrack,onBackToTracks,  state: { loginVisible, registerVisible, searchVisible, artistVisible, albumsVisible,tracksVisible,trackVisible, loginFeedback, registerFeedback, searchFeedback,albumsFeedback,tracksFeedback,trackFeedback, artist , albums,tracks,track} } = this
        return <main>
            {loginVisible && <Login onLogin={handleLogin} feedback={loginFeedback} onGoToRegister={onGoToRegister} />}
            {registerVisible && < Register onRegister={handleRegister} feedback={registerFeedback} onGoToLogin={onGoToLogin} />}
            {searchVisible && <Search onSearch={handleSearch} onLogout={onLogout} feedback={searchFeedback} />}
            {artistVisible && <Artist artist={artist} handleAlbums={handleAlbums}  />}
            {albumsVisible && <Albums  albums={albums} handleTracks={handleTracks} feedback={albumsFeedback} onBackToArtist={onBackToArtist}/>}
            {tracksVisible && <Tracks tracks={tracks} feedback={tracksFeedback} onBackToAlbums={onBackToAlbums} handleTrack={handleTrack} />}
            {trackVisible && <Track track={track} feedback={trackFeedback} onBackToTracks={onBackToTracks}/>}

        </main>
    }
}

ReactDOM.render(<App />, document.getElementById("root"))
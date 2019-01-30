spotifyApi.token = 'BQD_-fyu21VU9an79tG51D0ei1N5POp4pKxizeQ6hwrZylK3Z8ORIeH1AeAlxdMhMXTmQ5mcHNEh3Sdkw7vcgb9nmHKtaYfH8u06HUEMFIuuiWDIxZreRhjrqOtcFvWacePBivZrPoq1nQXZNTs'


class Login extends React.Component {
    state = { email: '', password: '' }

    handleLoginEmail = event => this.setState({ email: event.target.value })
    handleLoginPassword = event => this.setState({ password: event.target.value })

    handleFormSubmit = event => {
        event.preventDefault()
        const { state: { email, password }, props: { onLogin } } = this
        onLogin(email, password)
    }


    render() {

        const { handleLoginEmail, handleLoginPassword, props: { onGoToSearch, onGoToRegister, feedback } } = this

        return <section className="login">
            <h3>Login</h3>
            <form onSubmit={this.handleFormSubmit}>
                <div className="form-group">
                    <label>E-mail</label>
                    <input type="email" onChange={handleLoginEmail} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" onChange={handleLoginPassword} />
                </div>
                <button type="submit" onClick={onGoToSearch}>Login</button>
                <a className="link" onClick={onGoToRegister} href="#">Register</a>
            </form>
            {feedback && <Feedback message={feedback} />}
        </section>


    }
}

class Register extends React.Component {
    state = { name: '', surname: '', email: '', password: '', confirmPassword: '' }

    handleRegisterSurname = event => this.setState({ surname: event.target.value })
    handleRegisterEmail = event => this.setState({ email: event.target.value })
    handleRegisterName = event => this.setState({ name: event.target.value })
    handleRegisterPassword = event => this.setState({ password: event.target.value })
    handleRegisterConfirmPassword = event => this.setState({ confirmPassword: event.target.value })


    handleFormSubmit = event => {
        event.preventDefault()
        const { state: { name, surname, email, password, confirmPassword }, props: { onRegister } } = this
        onRegister(name, surname, email, password, confirmPassword)
    }


    render() {

        const { handleRegisterName, handleRegisterSurname, handleLoginEmail, handleLoginPassword, handleLoginConfirmPassword, props: { onGoToLogin, feedback } } = this

        return <section className="register">
            <h3>Register</h3>
            <form onSubmit={this.handleFormSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input type="name" onChange={handleRegisterName} />
                </div>
                <div className="form-group">
                    <label>Surname</label>
                    <input type="surname" onChange={handleRegisterSurname} />
                </div>
                <div className="form-group">
                    <label>E-mail</label>
                    <input type="email" onChange={handleLoginEmail} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" onChange={handleLoginPassword} />
                </div>
                <div className="form-group">
                    <label>ConfirmPassword</label>
                    <input type="confirmPassword" onChange={handleLoginConfirmPassword} />
                </div>
                <button type="submit"  >Register</button>
                <a href="#" onClick={onGoToLogin} >Login</a>
            </form>
            {feedback && <Feedback message={feedback} />}
        </section>
    }
}

class Search extends React.Component {
    state = { query: '', searchFeedback: '' }
    handleQueryInput = event => this.setState({ query: event.target.value })

    handleFormSubmit = event => {
        event.preventDefault()
        const { state: { query }, props: { onSearch } } = this
        onSearch(query)
    }




    render() {
        const { handleFormSubmit, handleQueryInput, props: { feedback, onLogout } } = this
        return <section className="search">
            <form onClick={handleFormSubmit}>
                <button onClick={onLogout}>Logout</button>
                <h2>Welcome </h2>
                <input type="text" onChange={handleQueryInput}></input>
                <button type="submit" >Search</button>
                {feedback && <Feedback message={feedback} />}
            </form>
        </section>
    }


}

class Artist extends React.Component {

    onGoToAlbums = artistId => {
        const {props:{handleAlbums}} = this
        handleAlbums(artistId)
    }

    render() {
        const { props: { artist } } = this

        
        return <section>
            <h3>Artist</h3>
            <button type="submit">Back</button>
            <ul>
                {artist.map(({ id, name, images }) => {
                    return <li key={id}><img onClick={() => this.onGoToAlbums(id)} src={images.length ? images[0].url : '/staff/tachi-fernandez/spotify-app-react/img/logo.png'}></img>{name}</li>
                })}
            </ul>
        </section>
    }

}

class Albums extends React.Component {
    state = { albumId: '' }
    onGoToTracks = albumId => {
        const {props:{handleTracks}} = this
        handleTracks(albumId)
    }
    
    render() {
        const { props: { albums,onBackToArtist } } = this

        console.log(albums)
        return <section>
            <h3>Albums</h3>
            <button onClick={onBackToArtist}>Back to artist</button>
            <ul>
                {albums.map(({ id, name, images }) => {
                    return <li key={id}><img onClick={() => this.onGoToTracks(id)} src={images.length ? images[0].url : '/staff/tachi-fernandez/spotify-app-react/img/logo.png'}></img>{name}</li>

                })}
            </ul>
        </section>
    }


}

class Tracks extends React.Component{
    state = { tracksId: '' }
    onGoToTrack = tracksId => {
        const {props:{handleTrack}} = this
        handleTrack(tracksId)
    }
    
    render(){
        const{props:{tracks,onBackToAlbums}} = this
        return <section>
            <h3>Tracks</h3>
            <button onClick={onBackToAlbums}>Back to Tracks</button>
            <ul>
                {tracks.map(({ id, name}) => {
                    return <li onClick={() => this.onGoToTrack(id)} key={id}>{name}></li>

                })}

            </ul>
        </section>
    }
}

class Track extends React.Component{
    render(){
        const{props:{track,onBackToTracks}} = this
        console.log(track)
        return <section>
            <h3>Track</h3>
            <button onClick={onBackToTracks}>Back to Tracks</button>
            <ul>
            <li key={track.id}><img src={track.album.images.length ? track.album.images[0].url : '/staff/tachi-fernandez/spotify-app-react/img/logo.png'}></img>{name}</li>
            <li><audio src={track.preview_url} controls ></audio></li>
            
            </ul>
        </section>
    }
}


function Feedback({ message }) {
    return <section>
        <p>{message}</p>
    </section>
}

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
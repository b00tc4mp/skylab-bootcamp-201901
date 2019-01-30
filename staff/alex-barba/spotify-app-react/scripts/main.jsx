

class Banner extends React.Component {

    render() {
        return <section className="hero is-light is-bold">
        <div className="hero-body">
            <div className="container has-text-centered">
                <h1 className="title">
                        🎶 Spotify App 🎧
                </h1>
            </div>
        </div>
    </section>
    }
}


class Login extends React.Component {
    state = {email: '', password: ''}

    handleEmailInput = event => this.setState({email: event.target.value})

    handlePasswordInput = event => this.setState({password: event.target.value})

    handleFormSubmit = event => {
        event.preventDefault()

        const { state: { email, password}, props: { onLogin } } = this

        onLogin(email, password)
    }

    handleOnRegister = () => {
        const { props: {onToRegister} } = this

        onToRegister()
    }

    render(){

        const { handleEmailInput, handlePasswordInput, handleFormSubmit, handleOnRegister, props: {feedback} } = this
        
        return <section className="login container margin-top" >
        <div className="columns is-mobile is-centered">
            <form className="login__form column is-half-widescreen is-half-tablet is-three-quarters-mobile is-centered" onSubmit={handleFormSubmit}>
                <h4 className="subtitle is-4">Login</h4>
                <div className="field">
                    <p className="control has-icons-left has-icons-right">
                        <input className="input is-small is-rounded" type="email" name="email" placeholder="Email" required onChange={handleEmailInput}/>
                        <span className="icon is-small is-left">
                            <i className="fas fa-envelope"></i>
                        </span>
                        <span className="icon is-small is-right">
                            <i className="fas fa-check"></i>
                        </span>
                    </p>
                </div>
                <div className="field">
                    <p className="control has-icons-left">
                        <input className="input is-small is-rounded" type="password" name="password" placeholder="Password" required onChange={handlePasswordInput} />
                        <span className="icon is-small is-left">
                            <i className="fas fa-lock"></i>
                        </span>
                    </p>
                </div>
                <div className="field is-grouped btn_grp">
                    <p className="control">
                        <button className="button is-success is-small is-rounded" type="submit">
                        Login
                        </button>
                    </p>
                    <p className="control"
                        ><a href="#" onClick={handleOnRegister} className="button is-outlined is-small is-rounded" >Register</a>
                    </p>
                </div>
            </form>
        </div>
        {feedback && <Feedback message={feedback} />}
    </section>
       
    }
}


class Register extends React.Component {
    state = {name:'', surname:'', email:'', password:'', passwordConfirmation:''}

    handleNameInput = event => this.setState({name: event.target.value})

    handleSurnameInput = event => this.setState({surname: event.target.value})

    handleEmailInput = event => this.setState({email: event.target.value})

    handlePasswordInput = event => this.setState({password: event.target.value})

    handlePasswordConfirmationInput = event => this.setState({passwordConfirmation: event.target.value})

    handleOnRegistration = event => {
        event.preventDefault()

        const { state: { name, surname, email, password, passwordConfirmation}, props: {onRegistration} } = this

        onRegistration(name, surname, email, password, passwordConfirmation)
    }

    handleOnLogin = () => {
        const { props: {onToLogin} } = this

        onToLogin()
    }

    render() {
         const { handleOnLogin, handleOnRegistration, handleNameInput, handleSurnameInput, handleEmailInput, handlePasswordInput, handlePasswordConfirmationInput, props: {feedback}  } = this
    
        return <section className="register container margin-top">
        <div className="columns is-mobile is-centered">
            <form onSubmit={handleOnRegistration} className="register__form column is-half-widescreen is-half-tablet is-three-quarters-mobile is-centered">
                <h4 className="subtitle is-4">Register</h4>
                <div className="field">
                    <p className="control has-icons-left has-icons-right">
                        <input className="input is-small is-rounded" type="text" name="name" placeholder="Name" required onChange={handleNameInput} />
                        <span className="icon is-small is-left">
                            <i className="far fa-user"></i>
                        </span>
                        <span className="icon is-small is-right">
                            <i className="fas fa-check"></i>
                        </span>
                    </p>
                </div>
                <div className="field">
                <p className="control has-icons-left has-icons-right">
                    <input className="input is-small is-rounded" type="text" name="surname" placeholder="Surame" required onChange={handleSurnameInput} />
                    <span className="icon is-small is-left">
                        <i className="far fa-user"></i>
                    </span>
                    <span className="icon is-small is-right">
                        <i className="fas fa-check"></i>
                    </span>
                </p>
                </div>
                <div className="field">
                    <p className="control has-icons-left has-icons-right">
                        <input className="input is-small is-rounded" type="email" name="email" placeholder="Email" required onChange={handleEmailInput}/>
                        <span className="icon is-small is-left">
                            <i className="fas fa-envelope"></i>
                        </span>
                        <span className="icon is-small is-right">
                            <i className="fas fa-check"></i>
                        </span>
                    </p>
                </div>
                <div className="field">
                    <p className="control has-icons-left">
                        <input className="input is-small is-rounded" type="password" name="password"placeholder="Password" required onChange={handlePasswordInput} />
                        <span className="icon is-small is-left">
                            <i className="fas fa-lock"></i>
                        </span>
                    </p>
                </div>
                <div className="field">
                    <p className="control has-icons-left">
                        <input className="input is-small is-rounded" type="password" name="password-confirmation"placeholder="Confirm password" required onChange={handlePasswordConfirmationInput}/>
                        <span className="icon is-small is-left">
                            <i className="fas fa-lock"></i>
                        </span>
                    </p>
                </div>
                <div className="field is-grouped btn_grp">
                    <p className="control">
                        <button className="button is-success is-small is-rounded" type="submit">
                        Register
                        </button>
                    </p>
                    <p className="control">
                        <a href="#" onClick={handleOnLogin} className="button is-outlined is-small is-rounded">
                        Login
                        </a>
                    </p>
                </div>
            </form>
        </div>
        {feedback && <Feedback message={feedback} />}
    </section>
    }
}

function Feedback( {message} ) {
    return <div className="columns is-mobile is-centered">
    <div className="column is-half is-centered button is-small is-inverted is-danger">
    {message}
    </div>
</div>
}

class Search extends React.Component {

    state = {query: ''}

    handleSearchInput = event => this.setState({query: event.target.value})

    handleOnSearch = (event) => {
       
        event.preventDefault()

        const {state: {query}, props: {onToSearch, feedback}} = this

        onToSearch(query, feedback)
    }

    handleOnLogout = () => {
        const { props: {onToLogout} } = this

        onToLogout()
    }

    handleOnFavourites = () => {
        const {props: {onToFavourites}} = this

        onToFavourites()
    }

    render() {
        const {handleOnSearch, handleSearchInput, handleOnLogout, handleOnFavourites, props:{feedback, user}} = this

        return <section className="search margin-top">
        <div className="level is-mobile">
            <div className="level-item">
                <h4 className="subtitle is-4" >Welcome, {user} !</h4>
            </div>
            <div className="level-item">
                <button onClick={handleOnFavourites} className="button is-rounded is-small search__logout"><i className="fas fa-heart"></i></button>
            </div>
            <div className="level-item">
                <button onClick={handleOnLogout} className="button is-rounded is-small search__logout"><i className="fas fa-sign-out-alt"></i></button>
            </div>
        </div>
        <div className="columns is-mobile is-centered">
            <div className="column is-two-thirds-tablet is-three-quarters-mobile is-centered"> 
                <form onSubmit={handleOnSearch} className="field has-addons has-addons-centered">
                    <div className="control has-icons-left is-expanded">
                        <input onChange={handleSearchInput}className="input is-small is-rounded" placeholder="Find an artist" type="text" name="query"></input>
                        <span className="icon is-small is-left">
                            <i className="fas fa-music"></i>
                        </span>
                    </div>
                    <div className="control">
                        <button className="button is-small is-rounded is-success"type="submit">Find!</button>
                    </div>
                </form>
            </div>
        </div>
        {feedback && <Feedback message={feedback} />}
    </section>
    }
}

class Artist extends React.Component {

    handleArtist = (id) => {

        const{ props: {onArtist, feedback}} = this

        onArtist(id, feedback)
    }


    render() {  
        const {props: { artists }, handleArtist} = this
    
        return <section className="resultsArtist container margin-top">
        <div className="columns is-mobile is-multiline is-centered">

        {
        artists.map(({ id, name, images, popularity, genres }) => {
            const genre = genres[0] ? genres[0] : 'No genre defined'
            const image = images[0] ? images[0].url :  'https://developer.spotify.com/assets/branding-guidelines/icon3@2x.png'
            
            return <div key={id} onClick={() => handleArtist(id)} data-id={id} className="column cursor card is-one-third-widescreen is-two-fifths-tablet is-three-quarters-mobile has-text-centered">
                <div className="hover card-image">
                    <figure className="image is-centered">
                        <img src={image} />
                    </figure>
                </div>
                <div className="card-content is-centered">
                    <h4 className="title is-4">{name}</h4>
                    <h5 className="subtitle is-6">Popularity Index :#{popularity}</h5>
                </div>
                <div className="card-footer">
                    <p className="subtitle is-6">Genre: {genre}</p>
                </div>
            </div>
            })
        }
        </div> 
    </section>
    }
}

class Album extends React.Component {

    handleAlbumChosen = id => {
        const{ props: {onAlbum, feedback}} = this

        onAlbum(id, feedback)
    }

    handleBackToArtists = () => {
        const { props: {onToArtists} } = this

        onToArtists()
    }

    render() {
        const {props: {albums}, handleAlbumChosen, handleBackToArtists} = this

        return <section className="resultsAlbum container margin-top">
        <div className="level is-mobile">
            <h4 className="level-item">Albums</h4>
            <div className="level-item">
                <button onClick={handleBackToArtists}className="button is-dark is-small is-rounded"><i className="fas fa-chevron-circle-left"></i> Back to Artists</button>
            </div>
        </div>
        <div className="albums columns is-mobile is-multiline is-centered">

        {
        albums.map(({ id, name, images, release_date, total_tracks }) =>{
            const image = images[0] ? images[0].url :  'https://developer.spotify.com/assets/branding-guidelines/icon3@2x.png'
            return <div onClick={() => handleAlbumChosen(id)} data-id={id} className="cursor column card is-one-third-widescreen is-two-fifths-tablet is-three-quarters-mobile is-centered">
            <div className="hover card-image">
                <figure className="image is-centered">
                    <img src={image} />
                </figure>
            </div>
            <div className="card-content is-centered">
                <h4 className="title is-4">{name}</h4>
                <h5 className="subtitle is-6">Tracks :{total_tracks} </h5>
            </div>
            <div className="card-footer">
                <p className="subtitle is-6">Released date: {release_date}</p>
            </div>
        </div>
        })
        }
        </div> 
        </section>
    }
}

class Tracks extends React.Component {
    handleTrackChosen = id => {
        const{ props: {onTrack, feedback}} = this

        onTrack(id, feedback)
    }

    handleBackToAlbums = () => {
        const { props: {onToAlbums} } = this

        onToAlbums()
    }
    render() {
        const {props: {tracks}, handleTrackChosen, handleBackToAlbums} = this

        return <section className="tracksAlbum container margin-top">
        <div className="level is-mobile">
            <h4 className="level-item">Tracks</h4>
            <div className="level-item">
                <button onClick={handleBackToAlbums}className="button is-dark is-small is-rounded"><i className="fas fa-chevron-circle-left"></i>  Back to Albums</button>
            </div>
        </div>
        <nav className="panel list-group track">

        {
        tracks.map(({id, name}) => {
            return <a onClick={() => handleTrackChosen(id)} data-id={id} className="panel-block">
            <span className="panel-icon">
                <i className="fas fa-music" aria-hidden="true"></i>
            </span>
            {name}
        </a>   
        })
        }
            </nav>
        </section>
    }
}

class Track extends React.Component {

    handleBackToTracks = () => {
        const { props: {onToTracks} } = this

        onToTracks()
    }

    handleFavourite = (id) => {
        const {props: {onFavourite} } = this
    
        onFavourite(id)
    }

    render() {
        const {props: {track: {id, name, preview_url, uri, album: {images}}, resultFavourite, userFavourites },handleBackToTracks, handleFavourite }= this
        
        const image = images[0] ? images[0].url :  'https://developer.spotify.com/assets/branding-guidelines/icon3@2x.png'

        var heart = resultFavourite ? <img className="icon" src="https://image.flaticon.com/icons/svg/148/148836.svg" />: <img className="icon" src="https://image.flaticon.com/icons/svg/149/149217.svg" />

        if (userFavourites) {
            heart = userFavourites.includes(id) ? <img className="icon" src="https://image.flaticon.com/icons/svg/148/148836.svg" /> : <img className="icon" src="https://image.flaticon.com/icons/svg/149/149217.svg" />
        }
        
        return <section className="trackChosen container margin-top">
            <div className="level is-mobile">
                <h4 className="level-item">Track</h4>
                <div className="level-item">
                    <button onClick={handleBackToTracks}className="button is-dark is-small is-rounded"><i className="fas fa-chevron-circle-left"></i>Back to Tracks</button>
                </div>
            </div>
            <div className="columns is-centered">
                <div data-id={id} className="column has-text-centered">
                    <img className="sm-image"src={image} />
                </div>
                <div className="column has-text-centered">
                    <div className="content">
                        <h3 className="margin-top title is-3">{name}</h3>
                        <button className="button is-large is-white"onClick={() => handleFavourite(id)}>
                            {heart}
                        </button>
                        <p>
                        <audio className="margin-top"src={preview_url} autoPlay controls></audio>
                        </p>
                        <p>
                            <a href={uri} className="margin-top button is-link is-small is-rounded">Listen to full song on Spotify</a>
                        </p>
                    </div>
                </div>
            </div>  
        </section>
        }
}

class ModalRegistration extends React.Component {
    

    handleClose = () => {
        const { props: { closeModal } } = this
        closeModal()
    }

    render() {
        const {handleClose} = this

        return <div onClick={handleClose}className="modal is-active">
        <div className="modal-background"></div>
            <div className="modal-content has-text-centered">
                <button className="button is-large is-light is-rounded"><i className="fas fa-check-circle"> </i> You have successfully registered!</button>
        </div>
      </div>
    }
}

class Favourite extends React.Component {

    handleTrackChosen = id => {
        const{ props: {onTrack, feedback}} = this

        onTrack(id, feedback)
    }

    handleBackToArtists = () => {
        const { props: {onToArtists} } = this

        onToArtists()
    }

    render() {
        const {props: {userFavourites}, handleTrackChosen, handleBackToArtist} = this

        return <section className="tracksAlbum container margin-top">
        <div className="level is-mobile">
            <h4 className="level-item">Favourite Tracks</h4>
            <div className="level-item">
                <button onClick={handleBackToArtist}className="button is-dark is-small is-rounded"><i className="fas fa-chevron-circle-left"></i>  Back to Artists</button>
            </div>
        </div>
        <nav className="panel list-group track">

        {
        userFavourites.map((id) => {
            return <a onClick={() => handleTrackChosen(id)} data-id={id} className="panel-block">
            <span className="panel-icon">
                <i className="fas fa-music" aria-hidden="true"></i>
            </span>
            Hola!
        </a>   
        })
        }
            </nav>
        </section>
    }
}


class App extends React.Component {

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
                    this.setState({tracksVisible: false, trackVisible: true, searchVisible: true, track})
                }
            })
        } catch (message) {
            this.setState({searchFeedback: message})
        }
    }

    handleToLogout = () => {
        this.setState({query: '', loginFeedback: '', registrationFeedback: '', searchVisible: false, artistVisible: false, albumVisible: false, tracksVisible: false, trackVisible: false, registerVisible: false, loginVisible: true})
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

    handleFavourites = (id) => {
        const {state:{userEmail}}= this
        var result = logic.retrieveFavourites(id, userEmail, (userFavourites) => {
            this.setState({userFavourites})
        })
        this.setState({resultFavourite : result})
    }

    onFavourites = () => {
        this.setState({searchVisible : false, loginVisible : false, registerVisible: false, artistVisible: false, albumVisible: false, tracksVisible: false, trackVisible: false, favouritesVisible: true})
    }

    render() {
        const { state: { searchFeedback, loginFeedback, registrationFeedback, registerVisible, loginVisible, searchVisible, artistVisible, albumVisible, tracksVisible, trackVisible, modalVisible, favouritesVisible,artists, user, albums, tracks, track, resultFavourite, userFavourites}, handleLogin, handleRegistration, handleLoginToRegister, handleRegisterToLogin, handleSearch, handleAlbum, handleTracks, handleTrack, handleToLogout, handleToArtists, handleToAlbums, handleToTracks, handleCloseModal, handleFavourites, onFavourites } = this

        return <main>
        <Banner />
        {loginVisible && <Login onLogin={handleLogin} feedback={loginFeedback} onToRegister={handleLoginToRegister}/>}
        {registerVisible && <Register onRegistration={handleRegistration} feedback={registrationFeedback} onToLogin={handleRegisterToLogin}/>}
        {searchVisible && <Search onToSearch={handleSearch} feedback={searchFeedback} user={user} onToLogout={handleToLogout} onToFavourites={onFavourites}/>}
        {artistVisible && <Artist artists={artists} onArtist={handleAlbum} />}
        {albumVisible && <Album albums={albums} onAlbum={handleTracks} onToArtists={handleToArtists}/>}
        {tracksVisible && <Tracks tracks={tracks} onTrack={handleTrack} onToAlbums={handleToAlbums} />}
        {trackVisible && <Track track={track} onToTracks={handleToTracks} onFavourite={handleFavourites}resultFavourite={resultFavourite} userFavourites={userFavourites}/>}
        {modalVisible && <ModalRegistration closeModal={handleCloseModal} />}
        {favouritesVisible && <Favourite track={track} userFavourites={userFavourites} onToArtists={handleToArtists} onTrack={handleTrack}/> }
    </main>
        
    }
}

ReactDOM.render(<App />, document.getElementById('root'))
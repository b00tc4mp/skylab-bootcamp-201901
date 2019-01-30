spotifyApi.token = 'BQCeU3lndOMjA6BBoLI2jeVR2Xg7vKlmWK7gZHGs42rkgzj011bR343vqWjZ7V0ovPe6XkZ82Tx-6EGmzok5M56t4RmHtOtchQdYl--b7oyfziEZ5AN4SBRbRAbFP2ol3vi0gN1p4v2W'

//#region login

class Login extends React.Component {
    state = { email: '', password: '' }

    handleEmailInput = event => this.setState({ email: event.target.value })

    handlePasswordInput = event => this.setState({ password: event.target.value })

    handleFormSubmit = event => {
        event.preventDefault()

        const { state: { email, password }, props: { onLogin } } = this

        onLogin(email, password)
    }

    handleRegisterButton = event => {
        event.preventDefault()

        this.props.goToRegister()
    }

    render() {
        const { handleEmailInput, handlePasswordInput, handleFormSubmit, handleRegisterButton, props: { feedback } } = this

        return <section className="login">
            <h2>Login</h2>

            <form onSubmit={handleFormSubmit}>
                <input type="text" name="email" onChange={handleEmailInput} />
                <input type="password" name="password" onChange={handlePasswordInput} />
                <button className="button">Log in</button>
            </form>

            <button className="button" onClick={handleRegisterButton}>Register</button>

            {feedback && <Feedback message={feedback} />}
        </section>
    }
}

//#endregion

//#region welcome

class Welcome extends React.Component {
    state = { username: '', query: '', firstLetter: '' }

    handleLogoutButton = event => {
        event.preventDefault()

        this.props.onLogout()
    }

    handleSearchInput = event => this.setState({ query: event.target.value })

    handleSearchFormSubmit = event => {
        event.preventDefault()

        const { state: { query }, props: { onSearch } } = this

        onSearch(query)
    }

    render() {
        const { handleLogoutButton, handleSearchFormSubmit, props: { feedback, name } } = this

        return <section className="welcome">
            <nav className="level">
                <div className="level-left">
                    <div className="level-item">
                        <h2 className="subtitle">Search</h2>
                    </div>
                    <div className="level-item">
                        <form onSubmit={handleSearchFormSubmit} className="field has-addons">
                            <p className="control">
                                <input onChange={this.handleSearchInput} className="input level-item" type="text" name="query" placeholder="search artist..." />
                            </p>
                            <p className="control">
                                <button className="button is-link is-inverted is-outlined level-item" type="submit" id="button-addon2"><i className="fas fa-search"></i></button>
                            </p>
                        </form>
                    </div>
                </div>
                <div className="level-right">
                    <p className="level-item">{name[0]}</p>
                </div>
            </nav>

            <button className="button" onClick={handleLogoutButton}>Logout</button>

            {/* {feedback && <Feedback message={feedback}/>}    */}
        </section>
    }
}

//#endregion

//#region artist

class Artist extends React.Component {
    state = { id: '' }

    // handleId = (event, id) => {
    //     //event.preventDefault()

    //     const { state: { id }, props: { onArtistClick } } = this

    //     onArtistClick(id)
    // }

    render() {
        const { props: { artistsList, handleArtistId } } = this

        return <section className="container panel">
            <h3>Artists</h3>
            <div className="columns is-multiline is-centered is-mobile cards">
                {
                    artistsList.map(artist => {
                        const image = artist.images[0] ? artist.images[0].url : 'https://i.pinimg.com/originals/35/87/f8/3587f8e9df02e2990b93afb9cd6d2323.jpg'
                        return <div key={artist.id} onClick={() => handleArtistId(artist.id)} className="card column is-one-quarter-widescreen is-one-third-desktop is-half-tablet is-three-quarters-mobile is-centered card" data-id={artist.id}>
                            <div className="card-image">
                                <figure className="image is-128by128">
                                    <img className="is-rounded" src={image} />
                                </figure>
                            </div>
                            <div className="card-content">
                                <p className="tittle">{artist.name}</p>
                                <p className="content">{artist.genres.join(', ')}</p>
                            </div>
                            <footer className="card-footer">
                                <div className="card-footer-item">
                                    <p>Followers:<br></br>{artist.followers.total}</p>
                                </div>
                                <div className="card-footer-item">
                                    <p>Popularity:<br></br>{artist.popularity}</p>
                                </div>
                            </footer>
                        </div>
                    })
                }
            </div>

            {/* {feedback && <Feedback message={feedback}/>} */}
        </section>
    }
}

//#endregion

//#region register

class Register extends React.Component {
    state = { name: '', surname: '', email: '', password: '', passwordConfirmation: '' }

    handleNameInput = event => this.setState({ name: event.target.value })

    handleSurnameinput = event => this.setState({ surname: event.target.value })

    handleEmailInput = event => this.setState({ email: event.target.value })

    handlePasswordInput = event => this.setState({ password: event.target.value })

    handlePasswordConfirmationInput = event => this.setState({ passwordConfirmation: event.target.value })

    handleLoginButton = event => {
        event.preventDefault()

        this.props.backToLogin()
    }

    handleRegisterFormSubmit = event => {
        event.preventDefault()

        const { state: { name, surname, email, password, passwordConfirmation }, props: { onRegister } } = this

        onRegister(name, surname, email, password, passwordConfirmation)
    }

    render() {
        const { handleNameInput, handleSurnameinput, handleEmailInput, handlePasswordInput, handlePasswordConfirmationInput, handleLoginButton, handleRegisterFormSubmit, props: { feedback } } = this

        return <section className="register">
            <h2>Register</h2>

            <form onSubmit={handleRegisterFormSubmit}>
                <input type="text" name="name" placeholder="name" onChange={handleNameInput} />
                <input type="text" name="surname" placeholder="surname" onChange={handleSurnameinput} />
                <input type="text" name="email" placeholder="email" onChange={handleEmailInput} />
                <input type="password" name="password" placeholder="password" onChange={handlePasswordInput} />
                <input type="password" name="passwordConfirmation" placeholder="password confirmation" onChange={handlePasswordConfirmationInput} />
                <button className="button">Register</button>
            </form>

            <button className="button" onClick={handleLoginButton}>Log In</button>

            {feedback && <Feedback message={feedback} />}
        </section>
    }
}

// function Feedback({ message }) {
//     return <section className='feedback'>{message}</section>
// }

//#endregion


//#region albums

class Albums extends React.Component {
    state = { id: '' }

    handleToArtists = event => {
        event.preventDefault()

        this.props.toArtists()
    }

    render() {
        const { handleToArtists, props: { albumsList, handleAlbumId } } = this

        return <section className="container panel">
            <h3>Albums</h3>
            <button onClick={handleToArtists} className="button">Back to Artists</button>
            <div className="columns is-multiline is-centered is-mobile cards">
                {
                    albumsList.map(album => {
                        const image = album.images[0] ? album.images[0].url : 'https://i.pinimg.com/originals/35/87/f8/3587f8e9df02e2990b93afb9cd6d2323.jpg'
                        return <div key={album.id} onClick={() => handleAlbumId(album.id, image)} className="card column is-one-quarter-widescreen is-one-third-desktop is-half-tablet is-three-quarters-mobile is-centered card" data-id={album.id}>
                            <div className="card-image">
                                <figure className="image is-128by128">
                                    <img className="is-rounded" src={image} />
                                </figure>
                            </div>
                            <div className="card-content">
                                <p className="titte">{album.name}</p>
                                <p className="content">{album.release_date}</p>
                            </div>
                        </div>
                    })
                }
            </div>
        </section>
    }
}

//#endregion

//#region tracks

class Tracks extends React.Component {
    state = { id: '', track: null, trackVisual: false }

    handleToAlbums = event => {
        event.preventDefault()

        this.props.toAlbums()
    }

    handleToArtists = event => {
        event.preventDefault()

        this.props.toArtists()
    }

    handleTracksId = (id) => {
        this.props.handleTracksId(id)

        this.setState({ trackVisual: true })
    }

    handleAddFavourite = (id) => {
        this.props.onAddFavourite(id)

    }

    render() {
        const { handleToAlbums, handleToArtists, handleTracksId, handleAddFavourite, props: { tracksList, albumCover }, state: { trackVisual } } = this
        return <section className="container panel">
            <h3>Tracks</h3>
            <button onClick={handleToArtists} className="button">Back to Artists</button>
            <button onClick={handleToAlbums} className="button">Back to Albums</button>
            <div className="columns is-multiline is-centered is-mobile cards">
                {
                    tracksList.map(tracks => {
                        return <div key={tracks.id} onClick={() => handleTracksId(tracks.id)} className="card column is-one-quarter-widescreen is-one-third-desktop is-half-tablet is-three-quarters-mobile is-centered card" data-id={tracks.id}>
                            <div className="card-content">
                                <img className="is-rounded" src={albumCover} />
                                <p className="titte">{tracks.name}</p>
                                <p className="content">Album: {tracks.album}</p>
                                <p className="content">{Math.round((tracks.duration_ms / 60000) * 100) / 100}min</p>
                                {/* <div className="content">{trackVisual && <Track track={this.props.track}/>}</div> */}
                            </div>
                        </div>
                    })
                }
            </div>
            <footer>
                {trackVisual && <Track track={this.props.track} onAddFavorite={handleAddFavourite} />}
            </footer>
        </section>
    }
}

//#endregion

//#region track

function Track({ track, onAddFavorite }) {
    return <section className="container panel">
        <h3>Track</h3>
        <div data-id={track.id}>
            <h3>{track.name}</h3>
            <audio controls autoPlay loop className="audio" src={track.preview_url}></audio>
        </div>
        <button onClick={() => onAddFavorite(track.id)}><i className="far fa-heart"></i></button>
    </section>
}

//#endregion



//#region App

class App extends React.Component {
    state = { artists: [], albums: [], tracks: [], track: {}, image: '', loginFeedback: '', name: '', welcomeVisual: false, registerVisual: false, loginVisual: true, artistsVisual: false, albumsVisual: false, tracksVisual: false, trackVisual: false }

    handleLogin = (email, password) => {
        try {
            logic.login(email, password, user => {
                console.log(user)
                this.setState({ loginFeedback: '', welcomeVisual: true, loginVisual: false, name: user.name })
            })
        } catch ({ message }) {
            console.error(error)
            // this.setState({ loginFeedback: message })
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

    handleName = (name) => {
        try {
            logic.retrieveName(name, (error) => {
                console.log('dfdfds')
                console.log(name)
                this.setState({ name })
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

    handleGoToLogin = () => {
        this.setState({ welcomeVisual: false, loginVisual: true, artistsVisual: false, albumsVisual: false, tracksVisual: false, trackVisual: false })
    }

    handleToLogin = () => {
        this.setState({ registerVisual: false, loginVisual: true, artistsVisual: false, albumsVisual: false, tracksVisual: false, trackVisual: false })
    }

    handleButtonToArtists = () => {
        this.setState({ artistsVisual: true, albumsVisual: false, albumsVisual: false, tracksVisual: false, trackVisual: false })
    }

    handleButtonToAlbums = () => {
        this.setState({ albumsVisual: true, tracksVisual: false, trackVisual: false })
    }



    render() {
        const { state: { loginFeedback, loginVisual, welcomeVisual, registerVisual, artistsVisual, albumsVisual, tracksVisual }, handleLogin, handleRegister, handleSearch, handleToAlbums, handleToTracks, handleToTrack, handleButtonToArtists, handleButtonToAlbums, handlefavourited } = this

        return <main className="app">
            <header>
                <h1 className="title"><i className="fas fa-headphones"></i> Spotify App</h1>
            </header>
            {loginVisual && <Login onLogin={handleLogin} feedback={loginFeedback} goToRegister={this.handleGoToRegister} />}
            {welcomeVisual && <Welcome onLogout={this.handleGoToLogin} onSearch={handleSearch} name={this.state.name} />}
            {registerVisual && <Register onRegister={handleRegister} backToLogin={this.handleToLogin} />}
            {artistsVisual && <Artist handleArtistId={handleToAlbums} artistsList={this.state.artists} />}
            {albumsVisual && <Albums albumsList={this.state.albums} handleAlbumId={handleToTracks} toArtists={handleButtonToArtists} />}
            {tracksVisual && <Tracks tracksList={this.state.tracks} albumCover={this.state.image} handleTracksId={handleToTrack} toArtists={handleButtonToArtists} toAlbums={handleButtonToAlbums} track={this.state.track} onAddFavourite={this.handleFavourited}/>}
        </main>
    }
}

ReactDOM.render(<App />, document.getElementById('root'))

//#endregion


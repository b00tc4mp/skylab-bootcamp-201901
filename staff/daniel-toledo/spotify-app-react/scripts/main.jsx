spotifyApi.token = ''

class Nav extends React.Component {
    handleLogout = event => {
        event.preventDefault()

        this.props.onLogout()
    }

    handleSearch = query => this.props.onSearch(query)

    render() {
        return <nav className="navbar navbar-light bg-light searchPanel">
            <img src="images/logo.png" width="200px" />
            {this.props.searchNavVisual && <Search onSearch={this.handleSearch} />}
            {this.props.logoutButtonVisual && <button onClick={this.handleLogout} className="btn btn-outline-dark" id="logout">Logout</button>}
        </nav>
    }
}

class Search extends React.Component {
    state = { query: '' }

    handleSearchInput = event => this.setState({ query: event.target.value })

    handleSubmit = event => {
        event.preventDefault()

        const { state: { query }, props: { onSearch } } = this

        onSearch(query)
    }

    render() {
        return <form onSubmit={this.handleSubmit} className="form-inline my-2 my-lg-0 row">
            <input onChange={this.handleSearchInput} className="form-control mr-sm-2 col-sm-8 col-12" type="search" name="query" placeholder="Search Artist..." aria-label="Search" />
            <button className="btn btn-outline-info my-2 my-sm-0 col-sm-3 col-12" type="submit">Search</button>
            {/* {this.props.feedback && <Feedback message={this.props.feedback} />} */}
        </form>
       
    }
}

class Login extends React.Component {
    state = { email: '', password: '' }

    handleEmailInput = event => this.setState({ email: event.target.value })

    handlePasswordInput = event => this.setState({ password: event.target.value })

    handleFormSubmit = event => {
        event.preventDefault()

        const { state: { email, password }, props: { onLogin } } = this

        onLogin(email, password)
    }

    handleRegisterLink = event => {
        event.preventDefault()

        this.props.loginToRegister()
    }

    render() {
        return <section className="welcome">
            <section className="login__margins">
                <div className="login container pl-lg-5 pr-lg-5">
                    <h2 className="col-2 mt-3">Login</h2>
                    <form onSubmit={this.handleFormSubmit} className="login__form form-group container mb-3 " >
                        <div className="row">
                            <label for="email" className="col col-md-3 col-sm-12 flex mt-1">Email</label>
                            <input onChange={this.handleEmailInput} type="email" className="col col-md-9 col-12 form-control mt-1" name="email" placeholder="Email" required />
                            <label for="password" className="col col-md-3 col-sm-12 flex mt-1">Password</label>
                            <input onChange={this.handlePasswordInput} type="password" className="col col-md-9 col-12 form-control mt-1" name="password" placeholder="Password" required />
                            {this.props.feedback && <Feedback message={this.props.feedback} />}
                        </div>
                        <div className="row login-flex mt-3">
                            <div className="col-md-3 col-0"></div>
                            <button type="submit" className="btn btn-dark col-12 col-sm-6 mr-2">Login</button>
                            <div className="pt-2 pt-sm-0">
                                <a onClick={this.handleRegisterLink} href="#" className="btn btn-outline-secondary login__register-link ">Register</a>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </section>
    }
}


class Home extends React.Component {


    handleSearch = query => this.props.onSearch(query)
    searchFeedback =() => this.props.feedback


    render() {
        return <section className="welcome">
            <div className="welcome__banner">
                <h2 className="text-center pt-5 display-2"> Welcome, <span></span>!</h2>
                <p className="text-center mt-2 display-5">Search for an Artist to listen its music. </p>
                <Search onSearch={this.handleSearch} feedback={this.searchFeedback} />
            </div>

        </section>
    }
}

class NavResults extends React.Component {

    state = { albumVisual: true, artistVisual: false, trackVisual: false }

    handleArtistButton = event => {
        event.preventDefault()

        this.props.artistButton()
    }

    handleAlbumButton = event => {
        event.preventDefault()

        this.props.albumButton()
    }

    render() {
        return <nav class="navbar navbar-expand navbar-light">

            <ul class="navbar-nav mr-auto">

                {<li class="nav-item active" id="artist">
                    <a onClick={this.handleArtistButton} class="nav-link ml-3" href="#">Artists</a>
                </li>}

                {this.props.albumButtonVisual && <li class="nav-item active" id="album">
                    <a onClick={this.handleAlbumButton} class="nav-link ml-3" href="#"> Albums</a>
                </li>}

                {this.props.trackButtonVisual && <li class="nav-item active" id="tracks">
                    <a class="nav-link ml-3" href="#">Tracks</a>
                </li>}
            </ul>

        </nav>
    }
}

class NetworkFeedback extends React.Component{
    state= {token:''}

    handleTokenInput = event => this.setState({ token: event.target.value }) 

    handleGetToken= event => {
        event.preventDefault()

        var token = this.state.token
        this.props.getToken(token)
    }

    render(){
        var link= "https://developer.spotify.com/console/get-search-item/?q=upc%3A00602537817016&type=album&market=&limit=&offset="
        return <section className="welcome">
        <section className="login__margins">
            <div className="login container pl-lg-5 pr-lg-5">
                <h2 className="mt-3">Token error</h2>
                <a href={link} target='_blank' >Get Token</a>
                <form onSubmit={this.handleGetToken} className="form-inline p-2 row">
                    <input onChange={this.handleTokenInput} className="form-control mr-sm-2 col-sm-6 col-12" type="text" name="token" placeholder="Insert Token..." aria-label="Search" />
                    <button className="btn btn-outline-info my-2 my-sm-0 col-sm-5 col-12" type="submit">Accept new Token</button>
                </form>
            </div>
        </section>
    </section> 
    }
}

class App extends React.Component {
    state = { networkFeedbackVisual: false, searchFeedback:'', artistsVisual: false, albumsVisual: false, homeVisual: false, tracksVisual: false, songVisual: false, loginVisual: true, logoutButtonVisual: false, artistVisual: false, searchNavVisual: false, navResultsVisual: false, albumImage: '', albumButtonVisual: false, trackButtonVisual: false }

    handleLogin = (email, password) => {

        try {
            logic.login(email, password, user => {

                this.setState({ homeVisual: true, loginVisual: false, logoutButtonVisual: true, loginFeedback: '' })

            })
        } catch ({ message }) {
            this.setState({ loginFeedback: message })
        }

    }

    handleLogout = () => {
        this.setState({ networkFeedbackVisual: false, homeVisual: false, navResultsVisual: false, searchNavVisual: false, logoutButtonVisual: false, loginVisual: true, albumButtonVisual: false, trackButtonVisual: false,artistsVisual: false, albumsVisual: false, tracksVisual: false, songVisual: false })

    }

    handleLogintoRegister = () => {
        this.setState({ loginVisual: false })
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
                this.setState({ song, albumsVisual: false, artistsVisual: false, tracksVisual: true, songVisual: true })

            })
        } catch (error) {
            console.error(error)
        }
    }

    handleGetToken = (token) => {
        this.setState({ networkFeedbackVisual:false, homeVisual: true})
        spotifyApi.token = token       
    }

    render() {
        return <main className="app">
            <Nav logoutButtonVisual={this.state.logoutButtonVisual} searchNavVisual={this.state.searchNavVisual} onLogout={this.handleLogout} onSearch={this.handleSearchNav} feedback={this.state.searchFeedback} />
            {this.state.navResultsVisual && < NavResults artistButton={this.handleArtistButton} albumButton={this.handleAlbumButton} albumButtonVisual={this.state.albumButtonVisual} trackButtonVisual={this.state.trackButtonVisual} />}
            {this.state.loginVisual && <Login onLogin={this.handleLogin} loginToRegister={this.handleLogintoRegister} feedback={this.state.loginFeedback} />}
            {this.state.homeVisual && < Home onSearch={this.handleSearchHome} feedback={this.state.searchFeedback} />}
            {this.state.networkFeedbackVisual && <NetworkFeedback getToken={this.handleGetToken} />}
            {this.state.artistsVisual && < Artists getArtistId={this.handleArtistId} artists={this.state.artists} />}
            {this.state.albumsVisual && < Albums getAlbumId={this.handleAlbumId} albums={this.state.albums} />}
            {this.state.songVisual && < Play song={this.state.song} />}
            {this.state.tracksVisual && < Tracks getTrackId={this.handleTrackId} tracks={this.state.tracks} image={this.state.albumImage} />}

        </main>
    }
}



function Artists({ artists, getArtistId }) {

    return <section className="results container p-3">
        <ul className="row container">
            {
                artists.map(artist => {
                    const image = artist.images[0] ? artist.images[0].url : 'https://cdn.pixabay.com/photo/2016/06/01/09/21/music-1428660_960_720.jpg'
                    return <div style={{ cursor: 'pointer' }} onClick={() => getArtistId(artist.id)} data-id={artist.id} class="card col-12 col-sm-6 col-md-4">
                        <li>
                            <img class="card-img-top" src={image} width="150px" />
                            <p class="card-title text-center">{artist.name}</p>
                        </li>
                    </div>
                })
            }
        </ul>
    </section>
}

function Albums({ albums, getAlbumId }) {

    return <section className="results container p-3">
        <ul className="row container">
            {
                albums.map(artist => {
                    const image = artist.images[0] ? artist.images[0].url : 'https://cdn.pixabay.com/photo/2016/06/01/09/21/music-1428660_960_720.jpg'
                    return <div style={{ cursor: 'pointer' }} onClick={() => getAlbumId(artist.id, image)} data-id={artist.id} class="card col-12 col-sm-6 col-md-4">
                        <li>
                            <img class="card-img-top" src={image} width="150px" />
                            <p class="card-title text-center">{artist.name}</p>
                        </li>
                    </div>
                })
            }
        </ul>
    </section>
}

function Tracks({ image, tracks, getTrackId }) {

    return <section className="results container">
        <div className="row flex">
            <img src={image} className="col-12 col-sm-6" width="40%" />
            <ul className="col-sm-6 pt-5 pl-3">
                {
                    tracks.map(track => {
                        return <li onClick={() => getTrackId(track.id)} data-id={track.id} style={{ cursor: 'pointer' }} className="mb-1">{track.name}</li>
                    })
                }
            </ul>
        </div>
    </section>
}

function Play({ song }) {

    return <section class="results container">
        <ul>
            <li data-id={song.id} class="row pt-5">
                <h3 class="col-12 col-sm-6 text-center display-5">{song.name}</h3>
                <audio controls autoPlay loop src={song.preview_url} class="col-12 col-sm-6">
                </audio>
            </li>
        </ul>
    </section>
}

function Feedback({ message }) {
    return <section class="error mt-2 col-12">{message}</section>
}

ReactDOM.render(<App />, document.getElementById('root'))
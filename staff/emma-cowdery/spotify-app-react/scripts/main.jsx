spotifyApi.token = 'BQB3V_QsMO0sOztimYlN1xv0JH8ihFhkp085-7pa_a4CUrU8S7BiUkE_LzgFFRmWx2yrDuwvJp4dom7UlXyPuFG1yqxZiyUImnGrLTRVGvc5qHx_jmQzUSK66iQQ_FehxikR1YDXFHrn'

//#region login

class Login extends React.Component {
    state = { email: '', password: ''}

    handleEmailInput = event => this.setState({ email: event.target.value})

    handlePasswordInput = event => this.setState({ password: event.target.value})

    handleFormSubmit = event => {
        event.preventDefault()

        const { state: { email, password}, props: {onLogin} } = this

        onLogin(email, password)
    }

    handleRegisterButton = event => {
        event.preventDefault()

        this.props.goToRegister()
    }

    render() {
        const { handleEmailInput, handlePasswordInput, handleFormSubmit, handleRegisterButton, props: { feedback }} = this

        return <section className="login">
            <h2>Login</h2>

            <form onSubmit={handleFormSubmit}>
                <input type="text" name="email" onChange={handleEmailInput} />
                <input type="password" name="password" onChange={handlePasswordInput} />
                <button className="button">Log in</button>
            </form>

            <button className="button" onClick={handleRegisterButton}>Register</button>

            {feedback && <Feedback message={feedback}/>}
        </section>
    }
}

//#endregion

//#region welcome

class Welcome extends React.Component {
    state = { username: '' , query:''}

    handleLogoutButton = event => {
        event.preventDefault()

        this.props.onLogout()
    }

    handleSearchInput = event => this.setState({query: event.target.value})

    handleSearchFormSubmit = event => {
        event.preventDefault()

        const { state: { query }, props: { onSearch } } = this

        onSearch(query)
    }

    render() {
        const { handleLogoutButton, handleSearchFormSubmit, props: { feedback }} = this

        return <section className="welcome">
            <nav className="level">
                <div className="level-left">
                    <div className="level-item">
                        <h2 className="subtitle">Search</h2>
                    </div>
                    <div className="level-item">
                        <form onSubmit={handleSearchFormSubmit} className="field has-addons">
                            <p className="control">
                                <input onChange={this.handleSearchInput} className="input level-item" type="text" name="query" placeholder="search artist..."/>
                            </p>
                            <p className="control">
                                <button className="button is-link is-inverted is-outlined level-item" type="submit" id="button-addon2"><i className="fas fa-search"></i></button>
                            </p>
                        </form>
                    </div>
                </div>
                <div className="level-right">
                    <p className="level-item">user</p>
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

    render () {
        const { props: {artistsList, handleId}} = this

        return <section className="container panel">
            <h3>Artists</h3>
            <div className="columns is-multiline is-centered is-mobile cards"></div>
            {
            artistsList.map(artist=> {
                const image = artist.images[0] ? artist.images[0].url : 'https://i.pinimg.com/originals/35/87/f8/3587f8e9df02e2990b93afb9cd6d2323.jpg'
                return <div onClick={() => handleId(artist.id)} className="card column is-one-quarter-widescreen is-one-third-desktop is-half-tablet is-three-quarters-mobile is-centered card" data-id={artist.id}>
                    <div className="card-image">
                        <figure className="image is-128by128">
                            <img className="is-rounded" src={image}/>
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
                </div>})
            }

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

    handlePasswordInput = event => this.setState({ password: event.target.value})

    handlePasswordConfirmationInput = event => this.setState({ passwordConfirmation: event.target.value })

    handleLoginButton = event => {
        event.preventDefault()

        this.props.backToLogin()
    }

    handleRegisterFormSubmit = event => {
        event.preventDefault()

        const { state: { name, surname, email, password, passwordConfirmation }, props: { onRegister }}=this

        onRegister(name, surname, email, password, passwordConfirmation)
    }

    render() {
        const { handleNameInput, handleSurnameinput, handleEmailInput, handlePasswordInput, handlePasswordConfirmationInput, handleLoginButton, handleRegisterFormSubmit, props: { feedback }} = this

        return <section className="register">
            <h2>Register</h2>

            <form onSubmit={handleRegisterFormSubmit}>
                <input type="text" name="name" placeholder="name" onChange={handleNameInput} />
                <input type="text" name="surname" placeholder="surname" onChange={handleSurnameinput} />
                <input type="text" name="email" placeholder="email" onChange={handleEmailInput} />
                <input type="password" name="password" placeholder="password" onChange={handlePasswordInput} />
                <input type="password" name="passwordConfirmation" placeholder="password confirmation" onChange={handlePasswordConfirmationInput}/>
                <button className="button">Register</button>
            </form>

            <button className="button" onClick={handleLoginButton}>Log In</button>

            {feedback && <Feedback message={feedback}/>}
        </section>
    }
}

// function Feedback({ message }) {
//     return <section className='feedback'>{message}</section>
// }

//#endregion


//#region App

class App extends React.Component {
    state = { artists: [], loginFeedback: '', welcomeVisual: false, registerVisual: false , loginVisual:true, artistsVisual:false, albumsVisual:true }

    handleLogin = (email, password) => {
        try {
            logic.login(email, password, user => {
                console.log(user)
                this.setState({ loginFeedback: '' , welcomeVisual: true, loginVisual: false })
            })
        } catch ({ message }) {
            console.error(error)
            // this.setState({ loginFeedback: message })
        }
    }

    handleRegister = (name, surname, email, password, passwordConfirmation) => {
        try {
            
            logic.register(name, surname, email, password, passwordConfirmation, () => {
                
                this.setState({ registerFeedback: '', registerVisual: false, loginVisual: true})
            })
        } catch ({ message }) {
            console.error(error)
            // this.setState({ loginFeedback: message })
        }
    }

    handleSearch = (query) => {
        try {
            logic.searchArtists(query, (error, artists) => {
                console.log(artists)
                this.setState({ artists, registerFeedback: '', artistsVisual: true})
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

    handleGoToRegister = () => {
        this.setState({ registerVisual: true, loginVisual: false })
    }

    handleGoToLogin = () => {
        this.setState({ welcomeVisual: false, loginVisual: true })
    }

    handleToLogin = () => {
        this.setState({ registerVisual: false, loginVisual: true})
    }

    render() {
        const { state: { loginFeedback, loginVisual, welcomeVisual, registerVisual, artistsVisual }, handleLogin, handleRegister, handleSearch, handleToAlbums } = this

        return <main className="app">
            <header>
                <h1 className="title"><i className="fas fa-headphones"></i> Spotify App</h1>
            </header>
            {loginVisual && <Login onLogin={handleLogin} feedback={loginFeedback} goToRegister={this.handleGoToRegister}/>}
            {welcomeVisual && <Welcome onLogout={this.handleGoToLogin} onSearch={this.handleSearch}/>}
            {registerVisual && <Register onRegister={handleRegister} backToLogin={this.handleToLogin}/>}
            {artistsVisual && <Artist handleId={handleToAlbums} artistsList={this.state.artists}/>}

        </main>
    }
}

ReactDOM.render(<App />, document.getElementById('root'))

//#endregion


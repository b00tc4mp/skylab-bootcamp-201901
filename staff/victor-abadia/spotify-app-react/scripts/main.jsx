spotifyApi.token = 'BQBbYPfXwXlQXDKLEOhtO_kyKvnZlmBgJyvCrmy7M1UAYM3zlcm00mWDQI0rO07MzDdn_l7LVhcKxXdaXeMZ1psccH-yy2_rTisPEx9xPi9zeJhdRnKEn3ReVmuE4Au-GxzU03egoxuUBfC9FE8'


function Results({ results, onItemClick }) {
    return <section className="results container" >
        <ul>
            {results.map(({ id, name, images }) => <li key={id} onClick={() => onItemClick(id)}>{name}
                <img className="images" src={images[0] ? images[0].url : 'https://developer.spotify.com/assets/branding-guidelines/icon3@2x.png'} alt="artis-image"></img>
            </li>)}

        </ul>
    </section>
}

class Search extends React.Component {
    state = { query: '' }

    handleQuery = ({ target: { value: query } }) => this.setState({ query })

    handleSearchSubmit = event => {
        event.preventDefault()

        const { state: { query }, props: { onSearch } } = this

        onSearch(query)
    }

    render() {
        const { handleQuery, handleSearchSubmit } = this

        return <section>
            <form className="register__form p-2" onSubmit={handleSearchSubmit}>
                <h4 className="font-weight-light-normal">Search</h4>
                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend"></div>
                </div>
                <input type="text" placeholder="Search an artist..." onChange={handleQuery} />
                <button type="submit">Search</button>
            </form>
        </section >
    }
}

class Home extends React.Component {
    state = { artists: null }

    handleSearch = query => logic.searchArtists(query, (error, artists) => {
        if (error) console.error(error)
        else this.setState({ artists: artists.map(({ id, name, images }) => ({ id, name, images })) })

    })

    handleArtistSelected = id => console.log('artist selected', id)

    render() {
        return <section className="home container">
            <Search onSearch={this.handleSearch} />
           {this.state.artists &&  <Results results={this.state.artists} onItemClick={this.handleArtistSelected} />}
        </section>
    }
}

class Register extends React.Component {
    state = { name: '', surname: '', email: '', password: '', passwordConfirmation: '' }

    handleName = (event) => {
        const name = event.target.value
        this.setState({ name })
    }

    handleSurname = (event) => {
        const surname = event.target.value
        this.setState({ surname })
    }

    handleEmail = (event) => {
        const email = event.target.value
        this.setState({ email })
    }

    handlePasword = (event) => {
        const password = event.target.value
        this.setState({ password })
    }

    handlePasswordConfirmation = (event) => {
        const passwordConfirmation = event.target.value
        this.setState({ passwordConfirmation })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.onHandleSubmit(this.state.name, this.state.surname, this.state.email, this.state.password, this.state.passwordConfirmation)
    }

    render() {
        return <section className="register container col-6">
            <form className="register__form p-2" onSubmit={this.handleSubmit}>
                <h4 className="font-weight-light-normal">Register</h4>
                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <label className="input-group-text" id="inputGroup-sizing-sm">Name</label>
                    </div>
                    <input className="form-control" type="text" name="name" aria-label="Small" aria-describedby="inputGroup-sizing-sm" required onChange={this.handleName} />
                </div>
                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <label className="input-group-text" id="inputGroup-sizing-sm">Surame</label>
                    </div>
                    <input className="form-control" type="text" name="surname" required onChange={this.handleSurname} />
                </div>
                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <label className="input-group-text" id="inputGroup-sizing-sm">Email</label>
                    </div>
                    <input className="form-control" type="email" name="email" required onChange={this.handleEmail} />
                </div>
                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <label className="input-group-text" id="inputGroup-sizing-sm">Password</label>
                    </div>
                    <input className="form-control" type="text" name="password" required onChange={this.handlePasword} />
                </div>
                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <label className="input-group-text" id="inputGroup-sizing-sm">Confirm password</label>
                    </div>
                    <input className="form-control" type="text" name="password-confirmation" required onChange={this.handlePasswordConfirmation} />
                </div>
                <a href="#" className="btn btn-sm active green" onClick={() => console.log('go to login')}><strong>Login</strong></a>
                <button type="submit" className="btn btn-sm active green"><strong>Register</strong></button>
            </form>
        </section>
    }
}

class Login extends React.Component {
    state = { email: '', password: '' }

    handleEmailChange = (event) => {
        const email = event.target.value
        this.setState({ email }) // this.setState({email: email })
    }

    handlePasswordChange = (event) => {
        const password = event.target.value
        this.setState({ password })
    }

    handleSubmit = (event) => {
        event.preventDefault()

        this.props.onHandleSubmit(this.state.email, this.state.password)
    }

    handlePageChange = (event) => {
        event.preventDefault()
        this.props.changePageFunc()
    }

    render() {
        return <section className="login container col-6">
            <h1 className="title">Spotify App</h1>
            <form className="login__form p-2" onSubmit={this.handleSubmit} >
                <h4 className="font-weight-light-normal">Login</h4>
                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <label className="input-group-text" id="inputGroup-sizing-sm">Email</label>
                    </div>
                    <input className="form-control" type="email" name="email" required onChange={this.handleEmailChange} />
                </div>
                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <label className="input-group-text" id="inputGroup-sizing-sm">Password</label>
                    </div>
                    <input className="form-control" type="password" name="password" required onChange={this.handlePasswordChange} />
                </div>
                <a href="#" className="btn btn-sm active green" onClick={this.handlePageChange}><strong>Register</strong></a>
                <button type="submit" className="btn btn-sm active green"><strong>Login</strong></button>
            </form>
        </section>
    }
}

class App extends React.Component {
    state = { loginVisible: true, registerVisible: false, homeVisible: false }

    handleClickRegisterButton = () => {
        this.setState({ loginVisible: false, registerVisible: true });
    };

    handleLogin = (thisEmail, thisPassword) => {
        try {
            logic.login(thisEmail, thisPassword, (user) => {

                this.setState({ loginVisible: false, homeVisible: true })

            })
        } catch (error) {
            console.log(error.message)
        }

    }

    handleRegister = (thisName, thisSurname, thisEmail, thisPassword, thisPasswordConfirmation) => {
        try {
            logic.register(thisName, thisSurname, thisEmail, thisPassword, thisPasswordConfirmation, () => {
                this.setState({ loginVisible: true, registerVisible: false })
            })
        } catch (error) {
            console.log(error.message)
        }

    }

    render() {
        return <div>
            {this.state.loginVisible && <Login onHandleSubmit={this.handleLogin} changePageFunc={this.handleClickRegisterButton} />}
            {this.state.registerVisible && <Register onHandleSubmit={this.handleRegister} />}
            {this.state.homeVisible && <Home />}
        </div>
    }
}

ReactDOM.render(<App />, document.getElementById('root'))
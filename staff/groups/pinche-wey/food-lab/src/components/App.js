import React, { Component } from 'react'
import logic from '../logic'
import Landing from './Landing'
import Register from './Register'
import RegisterOk from './RegisterOk'
import Login from './Login'
import Search from './Search'
import Home from './Home'
import './index.sass'
import queryString from 'query-string'


import { Route, withRouter, Switch, Link, Redirect } from 'react-router-dom'

class App extends Component {
    state = { visible: logic.isUserLoggedIn ? 'home' : 'landing', error: null, name: null, results: null }

    // handleRegisterNavigation = () => this.setState({ visible: 'register' }) // no es necesario hacer esto ya que lo manejamos con this.props.history.push('/register')

    handleRegisterNavigation = () => this.props.history.push('/register')
    handleLoginNavigation = () => this.props.history.push('/login')

    // handleLoginNavigation = () => this.setState({ visible: 'login' }) // no es necesario hacer esto ya que lo manejamos con this.props.history.push('/login')

    handleLogin = (username, password) => {
        try {
            logic.loginUser(username, password)
                .then(() =>
                    logic.retrieveUser()
                )
                .then(user => {

                    this.setState({ visible: 'home', name: user.name, url: user.photoUrl, error: null })
                    this.props.history.push('/home')
                })
                .catch(error =>
                    this.setState({ error: error.message })
                )
        } catch ({ message }) {
            this.setState({ error: message })
        }
    }

    componentDidMount() {
        logic.isUserLoggedIn &&
            logic.retrieveUser()
                .then(user =>
                    this.setState({ name: user.name, url: user.photoUrl })
                )
                .catch(error =>
                    this.setState({ error: error.message })
                )
    }

    handleRegister = (name, surname, email, confirmEmail, password, confirmPassword, confirmAge, confirmConditions) => {
        try {
            logic.registerUser(name, surname, email, confirmEmail, password, confirmPassword, confirmAge, confirmConditions)
                .then(() => {
                    this.setState({ visible: 'register-ok', error: null })
                    this.props.history.push('/login')
                })
                .catch(error =>
                    this.setState({ error: error.message })
                )
        } catch ({ message }) {
            this.setState({ error: message })
        }
    }

    handleLogout = () => {
        logic.logoutUser()

        this.setState({ visible: 'landing', name: null, url: null })
        this.props.history.push('/')
    }

    componentWillReceiveProps(props) {
        const { query, selector } = queryString.parse(props.location.search)

        query && this.search(query, selector)

    }

    search = (query, selector) =>
        logic.searchRecipes(query, selector)
            .then((recipes) =>
                this.setState({ results: recipes })
            )
            .catch(error =>
                this.setState({ error: error.message })
            )

    handleSearch = (query, selector) => this.props.history.push(`/home?selector=${selector}&query=${query}`)


    render() {
        const {
            state: { visible, error, name, url, results },
            handleRegisterNavigation,
            handleLoginNavigation,
            handleSearch,
            handleLogin,
            handleRegister,
            handleLogout
        } = this

        return <>
            <header className="header">

                <h1 className="header__title">
                    <Link className="header__title__link" to="/">FOOD<span className="header__title-colored">LAB</span></Link>
                </h1>

                <div className="header__searcher">
                    <Search onSearch={handleSearch} />
                </div>

                <div className="header__user">
                    <div className="header__user-img">
                        <img src={url} />
                    </div>
                    <p className="header__user-name" >{name}</p>
                    {visible !== 'landing' && <button className="header__user-button" onClick={handleLogout}> {visible === 'home' ? 'LogOut' : 'Return'}</button>}
                </div>

            </header>

            <Switch>
                <Route exact path="/" render={
                    () => logic.isUserLoggedIn ? <Redirect to="/home" /> : <Landing onRegister={handleRegisterNavigation} onLogin={handleLoginNavigation} />
                } />

                <Route exact path="/register" render={
                    () => logic.isUserLoggedIn ? <Redirect to="/home" /> : <Register onRegister={handleRegister} error={error} />
                } />

                <Route path="/login" render={
                    () => logic.isUserLoggedIn ? <Redirect to="/home" /> : <Login onLogin={handleLogin} error={error} />
                } />

                <Route path="/home" render={
                    () => logic.isUserLoggedIn ? <Home results={results} name={name} onSearch={handleSearch} onLogout={handleLogout} /> : <Redirect to="/" />
                } />

                <Redirect to="/" />
            </Switch>

            <footer className='footer'>

            </footer>

        </>
    }
}

export default withRouter(App)
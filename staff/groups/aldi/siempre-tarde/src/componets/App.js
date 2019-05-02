import React, { Component } from 'react'
import i18n from '../common/i18n'
import LanguageSelector from './LanguageSelector'
import Landing from './Landing'
import Register from './Register'
import Login from './Login'
import logic from '../logic'
import Home from './Home';
import StopCode from './StopCode';
import StopLine from './StopLine';
import Results from './Results';
import { Route, withRouter, Redirect, Switch } from 'react-router-dom'
import Favorites from './Favorites';
import CodeSearch from './CodeSearch';
import LineSearch from './LineSearch';



class App extends Component {
    state = { lang: i18n.language, visible: null, error: null, line: null, lines: [], favs: [] }

    handleLanguageChange = lang => this.setState({ lang: i18n.language = lang })

    handleRegisterNavigation = () => this.props.history.push('/register')

    handleLoginNavigation = () => this.props.history.push('/login')

    handleLogin = (username, password) => {
        try {
            logic.loginUser(username, password)
                .then(() =>
                    logic.retrieveUser()
                )
                .then(({ name }) => {
                    this.setState({ name, error: null }, () => this.props.history.push('/home'))
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
                    this.setState({ name: user.name })
                )
                .catch(error =>
                    this.setState({ error: error.message })
                )
    }

    handleRegister = (name, surname, username, password, password2) => {
        try {

            logic.registerUser(name, surname, username, password, password2)
                .then(() => {
                    this.setState({ error: null }, () => this.props.history.push('/login'))
                })
                .catch(error => {
                    this.setState({ error: error.message })
                })
        } catch ({ message }) {
            this.setState({ error: message })
        }
    }
    handleStopCode = () => {

        this.setState(() => this.props.history.push('/byidstop'))
    }
    handleLineCode = () => {
        logic.retrieveBusLines(undefined).then((resp) => {
            this.setState({ error: null, lines: resp }, () => this.props.history.push('/byidline'))
        })

    }
    handleFavorites = () => {
        logic.retrieveFavStops()
            .then(favs => this.setState({ favs }, () => this.props.history.push('/favoritestops')))

    }
    handleFavOut = (stop_id) => {
        logic.toggleFavStop(stop_id)
            .then(() => logic.retrieveFavStops())
            .then(favs => this.setState({ favs }, () => this.props.history.push('/favoritestops')))

    }

    handleLogout = () => {
        logic.logoutUser()

        this.props.history.push('/')
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) this.setState({ visible: null })
    }

    render() {
        const {
            state: { lang, error, lines, line, favs },
            handleLanguageChange,
            handleRegisterNavigation,
            handleLoginNavigation,
            handleLogin,
            handleRegister,
            handleLogout,
            handleStopCode,
            handleLineCode,
            handleFavorites,
            handleFavOut
        } = this

        return <>
            <LanguageSelector lang={lang} onLanguageChange={handleLanguageChange} />

            <Switch>
                <Route exact path="/" render={() => logic.isUserLoggedIn ? <Redirect to="/home" /> : <Landing lang={lang} onRegister={handleRegisterNavigation} onLogin={handleLoginNavigation} />} />

                <Route path="/register" render={() => logic.isUserLoggedIn ? <Redirect to="/home" /> : <Register lang={lang} onRegister={handleRegister} error={error} />} />

                <Route path="/login" render={() => logic.isUserLoggedIn ? <Redirect to="/home" /> : <Login lang={lang} onLogin={handleLogin} error={error} />} />

                <Route path="/home" render={() => logic.isUserLoggedIn ? <Home lang={lang} onStopCode={handleStopCode} onLineCode={handleLineCode} onFavorites={handleFavorites} onLogout={handleLogout} /> : <Redirect to="/" />} />

                <Route path="/byidstop" render={() => logic.isUserLoggedIn ? <CodeSearch lang={lang} items={lines} /> : <Redirect to="/" />} />


                <Route path="/byidline" render={() => logic.isUserLoggedIn ? <LineSearch lang={lang} items={lines} /> : <Redirect to="/" />} />

                <Route path="/favoritestops" render={() => logic.isUserLoggedIn ? <Favorites lang={lang} favs={favs} onFavOut={handleFavOut} onFavorites={handleFavorites} /> : <Redirect to="/" />} />


                <Redirect to="/" />
            </Switch>
        </>
    }
}

export default withRouter(App)
import React, { Component } from 'react'
import logic from '../logic'
import Landing from './Landing'
import Register from './Register'
import RegisterOk from './RegisterOk'
import Login from './Login'
import Search from './Search'
import Home from './Home'
import './index.sass'

class App extends Component {
    state = { visible: logic.isUserLoggedIn ? 'home' : 'landing', error: null, name: null, results: null }

    handleRegisterNavigation = () => this.setState({ visible: 'register' })

    handleLoginNavigation = () => this.setState({ visible: 'login' })

    handleLogin = (username, password) => {
        try {
            logic.loginUser(username, password)
                .then(() =>
                    logic.retrieveUser()
                )
                .then(user => {
                    this.setState({ visible: 'home', name: user.name, error: null })
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

    handleRegister = (name, surname, email, confirmEmail, password, confirmPassword, confirmAge, confirmConditions) => {
        try {
            logic.registerUser(name, surname, email, confirmEmail, password, confirmPassword, confirmAge, confirmConditions)
                .then(() =>
                    this.setState({ visible: 'register-ok', error: null })
                )
                .catch(error =>
                    this.setState({ error: error.message })
                )
        } catch ({ message }) {
            this.setState({ error: message })
        }
    }

    handleLogout = () => {
        logic.logoutUser()

        this.setState({ visible: 'landing' })
    }

    handleSearch = (query, selector) =>
        logic.searchRecipes(query, selector)
            .then((recipes) =>
                this.setState({ results: recipes })
            )
            .catch(error =>
                this.setState({ error: error.message })
            )

    render() {
        const {
            state: { visible, error, name, results },
            handleRegisterNavigation,
            handleLoginNavigation,
            handleSearch,
            handleLogin,
            handleRegister,
            handleLogout
        } = this

        return <>
            <header className="header">
                <h1 className="header__title" >FOOD<span className="header__title-colored" >LAB</span></h1>
                <div className="header__searcher">
                    <Search onSearch={handleSearch} />
                </div>

                <div className="header__user">
                    <div className="header__user-img">
                        <img src="http://www.europe-together.eu/wp-content/themes/sd/images/user-placeholder.svg" />
                    </div>
                    <p className="header__user-name" >{name}</p>
                    {visible !== 'landing' && <button className="header__user-button" onClick={handleLogout}> {visible === 'home' ? 'LogOut' : 'Return'}</button>}
                </div>

            </header>

            {visible === 'landing' && <Landing onRegister={handleRegisterNavigation} onLogin={handleLoginNavigation} />}

            {visible === 'register' && <Register onRegister={handleRegister} error={error} />}

            {visible === 'register-ok' && <RegisterOk onLogin={handleLoginNavigation} />}

            {visible === 'login' && <Login onLogin={handleLogin} error={error} />}

            {visible === 'home' && <Home results={results} name={name} onLogout={handleLogout} />}
        
        <footer className='footer'>

        </footer>

        </>

    }
}

export default App
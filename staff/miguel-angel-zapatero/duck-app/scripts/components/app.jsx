const { Component } = React

class App extends Component {
    state = {lang: i18n.language, visible: logic.isUserLoggedIn? 'home' : 'landing', name: null, error: null}

    handleLanguageChange = lang => {
        this.setState({ lang : i18n.language = lang }) //NOTE setter runs first, getter runs after (i18n)
    }

    handleLoginNavigation = () => {
        this.setState({visible: 'login'})
    }

    handleRegisterNavigation = () => {
        this.setState({visible: 'register'})
    }

    handleLogin = (email, password) => {
        try {
            logic.loginUser(email, password, error => {
                if (error) return this.setState({ error: error.message})

                logic.retrieveUser((error, user) => {
                    if (error) return this.setState({ error: error.message})

                    this.setState({ visible: 'home', name: user.name, error: null })
                })

            })
        } catch (error) {
            this.setState({ error: error.message })
        }
    }

    componentDidMount() {
        logic.isUserLoggedIn && logic.retrieveUser((error, user) => {
            if (error) return this.setState({ error: error.message })

            this.setState({ name: user.name })
        })
    }

    handleRegister = (name, surname, email, password) => {
        try {
            logic.registerUser(name, surname, email, password, (error) => {
                if (error) return this.setState({ error: error.message})

                this.setState({ visible: 'register-ok', error: null})
            })
        } catch(error) {
            return this.setState({ error: error.message })
        }
    }

    handleLogout = () => {
        logic.logoutUser()

        this.setState({ visible: 'landing' })
    }

    render() {
        const { 
            state: {lang, visible, error, name},
            handleLanguageChange,
            handleLoginNavigation,
            handleRegisterNavigation,
            handleLogin,
            handleRegister,
            handleLogout
        } = this

        return <>
            <LanguageSelector onLanguageChange={handleLanguageChange} lang={lang}/>
            
            {visible === 'landing' && <Landing lang={lang} onLogin={handleLoginNavigation} onRegister={handleRegisterNavigation} />}
            
            {visible === 'login' && <Login onLogin={handleLogin} lang={lang}/>}

            {visible === 'register' && <Register onRegister={handleRegister} lang={lang} error={error}/>}

            {visible === 'register-ok' &&  <RegisterOk onLogin={handleLoginNavigation} lang={lang}/>} 

            {visible === 'home' && <Home lang={lang} name={name} onLogout={handleLogout}/>}
        </>
    }
}
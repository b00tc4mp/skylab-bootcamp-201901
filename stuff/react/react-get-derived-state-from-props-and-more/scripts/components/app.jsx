'use strict';

(() => {
    const { Component, Fragment } = React
    const { Route, withRouter, Link, Redirect } = ReactRouterDOM
    const LanguageSelector = modules.import('language-selector')
    const Register = modules.import('register')
    const Login = modules.import('login')
    const Home = modules.import('home')

    class App extends Component {
        state = { selectedLanguage: 'en', registerFeedback: '', loginFeedback: '' }

        componentDidMount() {
            this.updateDocumentTitle()
        }

        updateDocumentTitle() {
            document.title = i18n[this.state.selectedLanguage].title
        }

        handleLanguageSelected = event => {
            this.setState({
                selectedLanguage: event.target.value
            }, this.updateDocumentTitle)
        }

        handleRegister = (name, surname, email, password, passwordConfirmation) => {
            try {
                logic.registerUser(name, surname, email, password, passwordConfirmation)
                    .then(() => this.setState({ registerFeedback: '' }))
            } catch ({ message }) {
                this.setState({ registerFeedback: message })
            }
        }

        handleGoToLogin = () => this.props.history.push('/login')

        handleLogin = (email, password) => {
            try {
                logic.loginUser(email, password)
                    .then(() => {
                        this.setState({ loginFeedback: '' }, () => this.props.history.push('/home'))
                    })
            } catch ({ message }) {
                this.setState({ loginFeedback: message })
            }
        }

        handleGoToRegister = () => this.props.history.push('/register')

        handleLogout = () => {
            logic.logout()

            this.props.history.push('/')
        }

        render() {
            const { state: { selectedLanguage, registerFeedback, loginFeedback }, handleLanguageSelected, handleRegister, handleLogin, handleGoToRegister, handleGoToLogin, handleLogout } = this

            const title = <h1>{i18n[selectedLanguage].title}</h1>

            return <main className="app">
                <LanguageSelector selectedLanguage={selectedLanguage} languages={['en', 'es', 'ca', 'ga', 'fr']} onLanguageSelected={handleLanguageSelected} />
                {title}
                <Route exact path="/" render={() => logic.userLoggedIn ? <Redirect to="/home" /> : <Fragment><Link to="/login">Login</Link> or <Link to="/register">Register</Link></Fragment>}></Route>
                <Route exact path="/register" render={() => logic.userLoggedIn ? <Redirect to="/home" /> : <Register title={i18n[selectedLanguage].registerTitle} onRegister={handleRegister} onGoToLogin={handleGoToLogin} feedback={registerFeedback} />} />
                <Route exact path="/login" render={() => logic.userLoggedIn ? <Redirect to="/home" /> : <Login title={i18n[selectedLanguage].loginTitle} onLogin={handleLogin} onGoToRegister={handleGoToRegister} feedback={loginFeedback} />} />
                <Route path="/home" render={() => logic.userLoggedIn ? <Home onLogout={handleLogout} /> : <Redirect to="/" />} />
            </main>
        }
    }

    modules.export('app', withRouter(App))
})()
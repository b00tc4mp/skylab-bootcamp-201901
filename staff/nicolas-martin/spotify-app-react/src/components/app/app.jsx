'use strict'

class App extends React.Component {
    state = {
        selectedLanguage: 'en', 
        loginFeedback: null, 
        user: null/*{ email: 'e@mail.com' }*/,
        loginVisible: true,
        registerVisible: false
    }

    handleLoginVisible = () => {
        this.setState({loginVisible: false, registerVisible: true})
    }

    handleRegisterVisible = () => {
        this.setState({loginVisible: true, registerVisible: false})
    }

    handleLanguageSelected = event => {
        this.setState({selectedLanguage: event.target.value})
    }

    handleRegister = (name, surname, email, password, passwordRepeat) => {
        try {
            logic.register(name, surname, email, password, passwordRepeat, () => { 
                this.setState({loginFeedback: null})
            })
        } catch ({ message }) {
            this.setState({ registerFeedback: message })
        }
    }

    handleLogin = (email, password) => {
        try {
            logic.login(email, password, user => {
                this.setState({ loginFeedback: null, user })
            })
        } catch ({ message }) {
            this.setState({ loginFeedback: message })
        }
    }

    render() {
        const { 
            state: { 
                selectedLanguage, 
                loginFeedback, 
                user, 
                registerFeedback,
                loginVisible,
                registerVisible
            },  
                handleLanguageSelected, 
                handleLogin, 
                handleRegister,
                handleLoginVisible,
                handleRegisterVisible,
            } = this
        const title = <h1>{i18n[selectedLanguage].title}</h1>

        return <main className="app">
            <LanguageSelector 
                selectedLanguage={selectedLanguage} 
                languages={['en', 'es', 'ca', 'ga', 'fr']} 
                onLanguageSelected={handleLanguageSelected} 
            />
            {title}
            {!user && loginVisible && <Login 
                        title={i18n[selectedLanguage].loginTitle} 
                        onLogin={handleLogin} 
                        feedback={loginFeedback}
                        loginVisible={handleLoginVisible}
                        />}
            {registerVisible && <Register
                        onRegister={handleRegister}
                        feedback={registerFeedback}
                        registerVisible={handleRegisterVisible}
                    />}
            {user && <Home language={selectedLanguage} />}
        </main>
    }
}
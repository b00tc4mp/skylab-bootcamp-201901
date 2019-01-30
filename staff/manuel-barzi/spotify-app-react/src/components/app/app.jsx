'use strict'

class App extends React.Component {
    state = { selectedLanguage: 'en', loginFeedback: null, user: { email: 'e@mail.com' } }

    handleLanguageSelected = event => {
        this.setState({
            selectedLanguage: event.target.value
        })
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
        const { state: { selectedLanguage, loginFeedback, user }, handleLanguageSelected, handleLogin } = this

        const title = <h1>{i18n[selectedLanguage].title}</h1>

        return <main className="app">
            <LanguageSelector selectedLanguage={selectedLanguage} languages={['en', 'es', 'ca', 'ga', 'fr']} onLanguageSelected={handleLanguageSelected} />
            {title}
            {!user && <Login title={i18n[selectedLanguage].loginTitle} onLogin={handleLogin} feedback={loginFeedback} />}
            {user && <Home language={selectedLanguage} />}
        </main>
    }
}
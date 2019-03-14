const i18n = {
    'en': {
        title: 'Hello, World!',
        loginTitle: 'Login form'
    },

    'es': {
        title: 'Hola, Mundo!',
        loginTitle: 'Formulario de inicio de sesión'
    },

    'ca': {
        title: 'Hola, Món!',
        loginTitle: 'Formulari d\'inici de sessió'
    },

    'ga': {
        title: 'Ola, Mundo!',
        loginTitle: 'Formulario de comezo da sesión'
    },

    'fr': {
        title: 'Bonjour, Monde!',
        loginTitle: 'Formulaire début'
    }
}

class Login extends React.Component {
    state = { email: '', password: '' } //Equivalente al constructor

    handleEmailInput = event => this.setState({ email: event.target.value }) //set state es de la API

    handlePasswordInput = event => this.setState({ password: event.target.value })

    handleFormSubmit = event => {
        event.preventDefault()
        const { state: { email, password }, props: { onLogin } } = this
        onLogin(email, password)
    }

    render() {
        const { handleEmailInput, handlePasswordInput, handleFormSubmit, props: { title, feedback } } = this

        return <section className="login">
            <h2>{title}</h2>

            <form onSubmit={handleFormSubmit}>
                <input type="text" name="email" onChange={handleEmailInput} />
                <input type="password" name="password" onChange={handlePasswordInput} />
                <button>Login</button>
            </form>

            {feedback && <Feedback message={feedback} level="warn" />}
        </section>
    }
}

function LanguageSelector({ selectedLanguage, onLanguageSelected, languages }) {
    return <select onChange={onLanguageSelected}>
        {languages.map(language => language === selectedLanguage ?
            <option value={language} selected>{language.toUpperCase()}</option> :
            <option value={language}>{language.toUpperCase()}</option>
        )}
    </select>
}

function Feedback({ message, level }) {
    return <section className={`feedback ${level ? `feedback--${level}` : ''}`}>{message}</section>
}

class App extends React.Component {
    state = { selectedLanguage: 'en', loginFeedback: '' }

    handleLanguageSelected = event => {
        this.setState({
            selectedLanguage: event.target.value
        })
    }

    handleLogin = (email, password) => {
        try {
            logic.login(email, password, user => {
                console.log(user)
            
                this.setState({ loginFeedback: '' })
            })
        } catch ({ message }) {
            this.setState({ loginFeedback: message })
        }
    }

    render() {
        const { state: { selectedLanguage, loginFeedback }, handleLanguageSelected, handleLogin } = this

        const title = <h1>{i18n[selectedLanguage].title}</h1>

        return <main className="app">
            <LanguageSelector selectedLanguage={selectedLanguage} languages={['en', 'es', 'ca', 'ga', 'fr']} onLanguageSelected={handleLanguageSelected} />
            {title}
            <Login title={i18n[selectedLanguage].loginTitle} onLogin={handleLogin} feedback={loginFeedback} />
        </main>
    }
}

ReactDOM.render(<App />, document.getElementById('root'))
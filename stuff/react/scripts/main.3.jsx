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

function handleLogin(event) {
    event.preventDefault()

    console.log('login submitted')
}

function LoginPanel(props) {
    return <section>
        <h2>{props.title}</h2>
        <form onSubmit={props.onLogin}>
            <input type="text" name="email" />
            <input type="password" name="password" />
            <button>Login</button>
        </form>
    </section>
}

function LanguageSelector({ selectedLanguage, onLanguageSelected, languages }) {
    return <select onChange={onLanguageSelected}>
        {languages.map(language => language === selectedLanguage ?
            <option value={language} selected>{language.toUpperCase()}</option> :
            <option value={language}>{language.toUpperCase()}</option>
        )}
    </select>
}

class App extends React.Component {
    // es6
    // constructor() {
    //     super()

    //     this.state = {
    //         selectedLanguage: 'en'
    //     }

    //     // es6
    //     // this.handleLanguageSelected = this.handleLanguageSelected.bind(this)
    // }

    // babel (es.next)
    state = { selectedLanguage: 'en' }

    // es6
    // handleLanguageSelected(event) {
    //     this.setState({
    //         selectedLanguage: event.target.value
    //     })
    // }

    // babel (es.next)
    handleLanguageSelected = event => {
        this.setState({
            selectedLanguage: event.target.value
        })
    }

    render() {
        const { state: { selectedLanguage }, handleLanguageSelected } = this

        const title = <h1>{i18n[selectedLanguage].title}</h1>

        return <main>
            <LanguageSelector selectedLanguage={selectedLanguage} languages={['en', 'es', 'ca', 'ga', 'fr']} onLanguageSelected={handleLanguageSelected} />
            {title}
            <LoginPanel title={i18n[selectedLanguage].loginTitle} onLogin={handleLogin} />
        </main>
    }
}

ReactDOM.render(<App />, document.getElementById('root'))
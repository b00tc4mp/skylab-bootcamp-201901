const i18nLanding = {
    en: {
        register: 'Register',
        or: 'or',
        login: 'Login'
    },
    es: {
        register: 'Regístrate',
        or: 'o',
        login: 'Inicia sesión'
    },
    ca: {
        register: 'Registra\'t',
        or: 'o',
        login: 'Inicia sessió'
    },
    ga: {
        register: 'Rexistrese',
        or: 'ou',
        login: 'Inicia sesión'
    }
}

function Landing(props) {
    const { lang } = props

    const literals = i18nLanding[lang]

    return <section onClick={e => e.preventDefault()}>
        <a href="" onClick={() => props.onRegister()}>{literals.register}</a> <span>{literals.or}</span> <a href="" onClick={() => props.onLogin()}>{literals.login}</a>.
    </section>
}
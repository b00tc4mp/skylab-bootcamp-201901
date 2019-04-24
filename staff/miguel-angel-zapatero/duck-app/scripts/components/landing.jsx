const Landing = (() => {
    const literals = {
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

    return function ({ lang, onRegister, onLogin }) {
        
        const { register, or, login } = literals[lang]

        return <section onClick={ e => e.preventDefault()}>
            <a href="" onClick={ () => onRegister()}>{register}</a> <span>{or}</span> <a href="" onClick={ () => onLogin()}>{login}</a>
        </section>
    }
})()
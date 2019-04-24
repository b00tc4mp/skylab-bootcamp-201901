const RegisterOk = (() => {
    const literals = {
        en: {
            msg: 'User successfully registered, you can proceed to',
            link: 'Login',
        },
        es: {
            msg: 'Usuario registrado, puedes proceder a',
            link: 'Iniciar sesión',
        },
        ca: {
            msg: 'Usuari registrat, pots procedir a',
            link: 'Inici sesió',
        },
        ga: {
            msg: 'Usuariño registriño, puedes proceder a',
            link: 'Inicio da sesión',
        }   
    }

    return function({ lang, onLogin }) {

        const { msg, link } = literals[lang]

        return <section>
            {msg} <a href="" onClick={e => {
                e.preventDefault()
                onLogin()
            }}>{link}</a>.
        </section>
    }
})()

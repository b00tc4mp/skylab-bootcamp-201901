const i18nLogin = {
    en: {
        title: 'Login',
        email: 'E-mail',
        password: 'Password'
    },
    es: {
        title: 'Iniciar sesión',
        email: 'E-milio',
        password: 'Contraseña'
    },
    ca: {
        title: 'Inici de sessió',
        email: 'E-mil·li',
        password: 'Contrasenya'
    },
    ga: {
        title: 'Inicio da sesión',
        email: 'E-miliño',
        password: 'Contrasinal'
    }
}

function Login(props) {
    const { lang } = props

    const literals = i18nLogin[lang]

    function handleSubmit(e) {
        e.preventDefault()

        const username = e.target.username.value
        const password = e.target.password.value

        props.onLogin(username, password)
    }

    return <>
        <h2>{literals.title}</h2>
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" placeholder={literals.email} />
            <input type="password" name="password" placeholder={literals.password} />
            <button>{literals.title}</button>
            <span>{props.error}</span>
        </form>
    </>
}
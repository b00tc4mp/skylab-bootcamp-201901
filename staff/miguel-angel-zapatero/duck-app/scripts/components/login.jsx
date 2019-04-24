const Login = (() => {
    const literals = {
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

return function({ lang, onLogin, error }) {
    const { title, email, password } = literals[lang]

    function handleSubmit(event) {
        event.preventDefault()

        const username = event.target.username.value
        const password = event.target.password.value

        onLogin(username, password)
    }

    return <form onSubmit={handleSubmit}>
        <h2>{title}</h2>
        <input type="text" name="username" placeholder={email} />
        <input type="password" name= "password" placeholder={password} />
        <button>{title}</button>
        <span>{error}</span>
    </form>
    }
})()
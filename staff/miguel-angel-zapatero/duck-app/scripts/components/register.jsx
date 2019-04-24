const i18nRegister = {
    en: {
        title: 'Register',
        name: 'Name',
        surname: 'Surname',
        email: 'E-mail',
        password: 'Password'
    },
    es: {
        title: 'Registro',
        name: 'Nombre',
        surname: 'Apellido',
        email: 'E-milio',
        password: 'Contraseña'
    },
    ca: {
        title: 'Registre',
        name: 'Nom',
        surname: 'Cognom',
        email: 'E-mil·li',
        password: 'Contrasenya'
    },
    ga: {
        title: 'Rexistro',
        name: 'Nome',
        surname: 'Apelido',
        email: 'E-miliño',
        password: 'Contrasinal'
    }
}

function Register(props) {
    const { lang } = props

    const literals = i18nRegister[lang]

    function handleSubmit(e) {
        e.preventDefault()

        const {
            name: { value: name },
            surname: { value: surname },
            username: { value: username },
            password: { value: password }
        } = e.target

        props.onRegister(name, surname, username, password)
    }

    return <>
        <h2>{literals.title}</h2>
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder={literals.name} />
            <input type="text" name="surname" placeholder={literals.surname} />
            <input type="text" name="username" placeholder={literals.email} />
            <input type="password" name="password" placeholder={literals.password} />
            <button>{literals.title}</button>
            <span>{props.error}</span>
        </form>
    </>
}
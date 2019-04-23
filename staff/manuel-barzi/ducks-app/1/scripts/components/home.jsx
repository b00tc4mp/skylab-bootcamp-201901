const i18nHome = {
    en: {
        hello: 'Hello',
        logout: 'Logout'
    },
    es: {
        hello: 'Hola',
        logout: 'Cerrar sesión'
    },
    ca: {
        hello: 'Hola',
        logout: 'Tanca sessió'
    },
    ga: {
        hello: 'Hola',
        logout: 'Finalizar sesión'
    }
}

function Home({ lang, name, onLogout }) {
    const literals = i18nHome[lang]

    return <main>
        <h1>{literals.hello}, {name}!</h1>
        <button onClick={onLogout}>{literals.logout}</button>
        {/* TODO <Search /> */}
    </main>
}
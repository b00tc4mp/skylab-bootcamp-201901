const Home = (() => {
    const literals = {
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
            hello: 'Holiña',
            logout: 'Finalizar sesión'
        }
    }

    return function({ lang, name, onLogout }) {
        const { hello, logout } = literals[lang]
        
        return <main>
            <h1>{hello}, {name}!</h1>
            <button onClick={onLogout}>{logout}</button>
            <Search lang={lang} onSearch={console.log(value)}/>
        </main>
    }
})()

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
            hello: 'Hola',
            logout: 'Finalizar sesión'
        }
    }

    const { Component } = React

    return class extends Component {
        state = { error: null, ducks: [], duck: null }

        handleSearch = query =>
            logic.searchDucks(query, (error, ducks) => {
                if (error) return this.setState({ error: error.message })

                this.setState({ duck: null, ducks: ducks.map(({ id, title, imageUrl: image, price }) => ({ id, title, image, price })) })
            })

        handleRetrieve = id =>
            logic.retrieveDuck(id, (error, { title, imageUrl: image, description, price }) => {
                if (error) return this.setState({ error: error.message })

                this.setState({ duck: { title, image, description, price } })
            })

        render() {
            const {
                handleSearch,
                handleRetrieve,
                state: { ducks, duck },
                props: { lang, name, onLogout }
            } = this

            const { hello, logout } = literals[lang]

            return <main>
                <h1>{hello}, {name}!</h1>
                <button onClick={onLogout}>{logout}</button>
                <Search lang={lang} onSearch={handleSearch} />
                {!duck && <Results items={ducks} onItem={handleRetrieve} />}
                {duck && <Detail item={duck} />}
            </main>
        }
    }
})()
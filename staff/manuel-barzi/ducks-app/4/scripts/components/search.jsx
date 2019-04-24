const Search = (() => {
    const literals = {
        en: {
            search: 'Search'   
        },
        es: {
            search: 'Buscar'   
        },
        ca: {
            search: 'Cerca'   
        },
        ga: {
            search: 'Buscar'   
        }
    }

    return function({lang, onSearch}) {
        const { search } = literals[lang]

        return <form onSubmit={e => {
            e.preventDefault()

            const query = e.target.query.value

            onSearch(query)
        }}>
            <input type="text" name="query"/>
            <button>{search}</button>
        </form>
    }
})()
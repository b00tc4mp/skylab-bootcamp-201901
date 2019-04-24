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
            search: 'Buscariño'          
        }
    }

    return function({ lang, onSearch }) {
        
        const { search } = literals[lang]

        function handleSubmit(e) {
            e.preventDefault()
            onSearch(e.target.query.value) 
        }


        return <form onSubmit={handleSubmit}>
            <input type="text" name="query"/>
            <button>{search}</button>
        </form>
    }
})()
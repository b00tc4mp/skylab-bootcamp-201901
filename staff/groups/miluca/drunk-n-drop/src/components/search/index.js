import React from 'react'



function Search({onSearch,error}) {
    

    function handleSubmit(e){
        e.preventDefault()
        const query = e.target.search.value
        onSearch(query)
    }

    
    
    return <section className ="search">
    <form onSubmit={handleSubmit}>
        <input type="text"  name ="search" />
        <button>Search</button>
        <span>{error}</span>
    </form>

</section>
}


export default Search
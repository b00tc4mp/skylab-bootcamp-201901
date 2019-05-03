import React from 'react'
import './index.sass'


function Search({onSearch,error}) {
    

    function handleSubmit(e){
        e.preventDefault()
        const query = e.target.search.value
        onSearch(query)
    }

    
    
    return <section class=" searcher_back">
    <form onSubmit={handleSubmit}>
        <input class="input is-rounded is-small"type="text"  name ="search" />
    </form>

</section>
}


export default Search
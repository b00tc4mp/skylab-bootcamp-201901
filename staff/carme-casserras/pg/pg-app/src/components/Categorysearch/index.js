import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import './index.sass'
import CategoryResults from '../Categoryresults'
import logic from '../../logic'

const nameCategory = {
   0: 'electrodomesticos',
   1: 'libros',
   2: 'hogar',
   3: 'electronica',
   4: 'ropa'
}

function CategorySearch(props) {

   const [query, setQuery] = useState(null)

   const handleSearchByCategory = id => {

     if(!logic.isUserLoggedIn) props.history.push('/login')
     else props.history.push('/search/category/' + id)
   }
        
   const renderCategory = () => (
      <div>
         {
            Object.values(nameCategory).map(id => {
               
               return (
                  <div key={id} onClick={() => handleSearchByCategory(id)}>                     
                     <label htmlFor={id}>
                        <h1>{id}</h1>
                        <img src={`../../../images/${id}.png`} />
                     </label>
                  </div>
               )
            })
         }
      </div>
   )

   return (
      <div>
         <form>
            {renderCategory()}
         </form>
         {query && <CategoryResults  query={query}/>}
      </div>
   )
}
export default withRouter(CategorySearch)


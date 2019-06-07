import React, { useState } from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom'
import './index.sass'
import CategoryResults from '../Categoryresults';
import logic from '../../logic';

const nameCategory = {
   0: 'electrodomesticos',
   1: 'libros',
   2: 'hogar',
   3: 'electronica',
   4: 'ropa'
}

function CategorySearch(props) {

   const [query, setQuery] = useState(null)


   const handleQuery = e => {
      
      const { value } = e.target
      setQuery(value)      
   }

   const handleSearchByCategory = id => {

     if(!logic.isUserLoggedIn) props.history.push('/login')
     else props.history.push('/search/category/' + id)


   }
        
   const renderCategory = () => (
      <div>
         {
            Object.keys(nameCategory).map(cat => {
               const id = nameCategory[cat]

               return (
                  <div key={id} onClick={() => handleSearchByCategory(id)}>
                     {/* <input type="checkbox" onChange={handleQuery} value={id} name={id} /> */}
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
         {/* { !query || !logic.isUserLoggedIn ? <Redirect to='/register' /> : query && <CategoryResults  query={query}/> } */}
         {/* <CategoryResults  query={query}/> */}
      </div>
   )
}
export default withRouter(CategorySearch)


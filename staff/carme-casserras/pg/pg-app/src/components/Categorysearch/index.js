import React, { useState } from 'react'
import './index.sass'
import CategoryResults from '../Categoryresults';

const nameCategory = {
   0: 'electrodomesticos',
   1: 'libros',
   2: 'hogar',
   3: 'electronica',
   4: 'ropa'
}

function CategorySearch() {

   const [query, setQuery] = useState(null)

   const handleQuery = e => {

      
      const { value } = e.target
      setQuery(value)
   }

   const renderCategory = () => (
      <div>
         {
            Object.keys(nameCategory).map(cat => {
               const id = nameCategory[cat]

               return (
                  <div key={id}>
                     <input type="checkbox" onChange={handleQuery} value={id} name={id} />
                     <label htmlFor={id}>
                        <h1>{id}</h1>
                        <img src={`../../../public/images/${id}.png`} />
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
         {query && <CategoryResults  query={query}/> }
      </div>
   )
}
export default CategorySearch


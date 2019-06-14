import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import './index.sass'
import CategoryResults from '../Categoryresults'
import Footer from '../Footer'
import logic from '../../logic'

const nameCategory = {
   0: 'Books',
   1: 'Clothes',
   2: 'Electronics',
   3: 'Home',
   4: 'Home appliance',
}

function CategorySearch(props) {

   const [query, setQuery] = useState(null)

   const handleSearchByCategory = id => {

     if(!logic.isUserLoggedIn) props.history.push('/login')
     else props.history.push('/search/category/' + id)
   }
        
   const renderCategory = () => (
      <div className="contens1">
         {/* <div > */}
            <ul className="navigation-body"> 
         {
            Object.values(nameCategory).map(id => {   

                  return (                    
                  <li key={id} onClick={() => handleSearchByCategory(id)} className="lisearch" htmlFor={id}>
                     <img className="imgsearch" src={`../../../images/${id}.png`} alt=""/>
                  </li>
               )} 
            )
         }
            </ul>
         {/* </div> */}
         {<Footer/>}
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

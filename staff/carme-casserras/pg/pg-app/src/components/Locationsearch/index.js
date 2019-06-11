import React, { useState } from 'react'
import Maps from '../Maps'
import { withRouter } from 'react-router-dom'
import './index.sass'
import logic from '../../logic'
import LocationResults from '../Locationresults'
function LocationSearch(props) {

    
    return (
        <Maps />
    )
}
export default withRouter(LocationSearch)
//

// const nameLocation = {

//     0: 'Poblenou',
//     1: 'Glories',
//     2: 'Urquinaona',
//     3: 'Mallorca',
//     4: 'Valencia',
//     5: 'Gotic',
// }

// function LocationSearch(props) {

//     const [query, setQuery] = useState(null)

//     const handleSearchByLocation = id => {

//         if (!logic.isUserLoggedIn) props.history.push('./login')
//         else props.history.push('/search/locations/')
//     }

//     const renderLocation = () => (
//         <div className="contens3">
//             <div className="navigation-body3">
//                 <ul className="lusearch3">
//                     {
//                         Object.values(nameLocation).map(name => {

//                             return (
//                                 <li key={name} onClick={() => handleSearchByLocation(name)} className="lisearch" htmlFor={name}>

//                                     <h1>{name}</h1>
//                                 </li>
//                             )
//                         })
//                     }
//                 </ul>
//             </div>
//         </div>
//     )
//     return (
//         <div>
//             <form>
//                 {renderLocation()}
//             </form>
//             {query && <LocationResults query={query} />}
//            
//         </div>
//     )
// }


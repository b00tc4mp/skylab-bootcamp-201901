import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import './index.sass'
import logic from '../../logic'

// function LocationResults(props) {
//     const [results, setResults] = useStates([])

//     const { match: { params: { location } } } = props


//     useEffect(() => {

//         async function retrieve() {
//             const res = await logic.searchByLocation(location)
//             setResults(res)
//         } retrieve()
//             ()
//     }, [location])

//     const handleLocation = id => {

//         props.history.push('/thing/' + id)
//     }

//     return (<div className="contens4">
//         <ul className="navigation-bodyresults4">

//             {results &&

//                 results.map(({ _d: id, status, image, description, loc: { name } }) => {

//                     return status == 0 &&
//                         (<li className="liresults4" key={id} onClick={() => handleLocation(id)}>
//                             <div className="product-short4">
//                                 <img className="imgresults4" src={image} />
//                                 <div>
//                                     <h2><strong>Category</strong> {category}</h2>
//                                     <p><strong>Description</strong> {description}</p>
//                                     <p><strong>Location</strong> {name}</p>
//                                 </div>
//                             </div>
//                         </li>)
//                 })
//             }
//         </ul>
//     </div>
//     )
// }
// export default LocationResults

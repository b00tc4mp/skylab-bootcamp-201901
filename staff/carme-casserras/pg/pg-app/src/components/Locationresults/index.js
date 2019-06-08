import React from 'react'
import { withRouter } from 'react-router-dom'
import './index.sass'
import logic from '../../logic'

function LocationResults(props) {
    // const [results, setResults] = useStates([])

    // const { match: { params: { category } } } = props


    // useEffect(() => {

    //     return(async () => {
    //         const res = await logic.searchByLocation(location)
    //         setResults(res)
    //     })()
    // }, [location])

    // const handleLocation = id => {

    //     props.history.push('/thing/' + id)
    // }

    // return (<ul>

    //     {results &&

    //         results.map(({ _d: id, status, image, description, loc: { name } }) => {
    //             return status == 0 &&
    //             (<li key={id} onClick={() => handleLocation(id)}>
    //                 <p>{id}</p>
    //                 <img src={image}/>
    //                 <h2>{category}</h2>
    //                 <p>{description}</p>
    //                 <p>{name}</p>
    //             </li>)
    //         })
    //     }
    // </ul>
    // )
}
export default LocationResults

import React, {useEffect, useState} from 'react'
import './index.sass'
import logic from '../../logic';

function CategoryResults({query}) {
    const [results, setResults] = useState([])

    useEffect(() => {
        async function fetchData (){
            const res = await logic.searchByCategory(query)
            setResults(res)
        }
        fetchData()
    }, [query])

    return (<ul>
        
        { results && 
        
            results.map(({status, category, description, loc:{ name } }) => { 
                return status == 0 &&
                (<li key={description}>
                    <h2>{category}</h2>
                    <p>{description}</p>
                    <p>{name}</p>
                </li>)               
            })
        }
        }
    </ul>)
    
    
}
export default CategoryResults
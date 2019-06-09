import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import './index.sass'
import logic from '../../logic'

function CategoryResults(props) {
    const [results, setResults] = useState([])

    const { match: { params: { category } } } = props

    useEffect(() => {
        async function retrieve() {
            const res = await logic.searchByCategory(category)
            setResults(res)
        }
        retrieve()
    }, [category])

    const handleThing = id => {

        props.history.push('/thing/' + id)
    }

    return (<ul>

        {results &&

            results.map(({ _id : id, status, image, category, description, loc: { name } }) => {
                return status == 0 &&
                    (<li key={id} onClick={() => handleThing(id)}>
                        <img src={image}/>
                        <h2>{category}</h2>
                        <p>{description}</p>
                        <p>{name}</p>
                    </li>)
            })
        }
    </ul>
    )
}
export default withRouter(CategoryResults)
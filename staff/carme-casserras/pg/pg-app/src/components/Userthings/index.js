import React, { useEffect, useState } from 'react'
import './index.sass'
import logic from '../../logic';

function UserThings() {

    const [results, setResults] = useState([])

    useEffect(() => {
        async function retrieve() {
            const res = await logic.retrivePrivateThings('userId')
            setResults(res)
        }
        retrieve()
    }, [])

    return (<ul>
        <div>
            <h1>AWARDS</h1>
            <p>For each </p>
        </div>

        {results &&
            results.map(({ image, category, description, loc: { name } }) => {

                return (

                    <li key={category}>
                        <img src={image} />
                        <h2>{category}</h2>
                        <p>{description}</p>
                        <p>{name}</p>
                    </li>)
            })
        }
    </ul>
    )
}

export default UserThings

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
        {results &&
            results.map(({ image, category, description, loc: { name } }) => {

                return (
                    // <div>
                    //     <p>LOREM IPSUM</p>
                    // </div>
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

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

    return (<div className="contens3">
        <ul className="navigation-bodyresults1">
            <div className="awards">
                <h1><strong>AWARDS</strong></h1>
                <p>For each upload thing you can take a </p>
            </div>

            {results &&
                results.map(({ image, category, description, loc: { name } }) => {

                    return (

                        <li className="liresults1" key={category}>
                            <div className="product-short1">
                                <img className="imgresults1" src={image} alt=""/>
                                <div>
                                    <h2><strong>Category: </strong> {category}</h2>
                                    <p><strong>Description: </strong> {description}</p>
                                    <p><strong>Location: </strong> {name}</p>
                                </div>
                            </div>
                        </li>)
                })
            }
        </ul>
    </div>
    )
}

export default UserThings

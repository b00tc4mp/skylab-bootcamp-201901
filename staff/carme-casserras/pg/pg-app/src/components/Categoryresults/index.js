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

    return (<div className="contens2">
    <ul className="navigation-bodyresults">

        {results &&

            results.map(({ _id: id, status, image, category, description, loc: {name} }) => {

                return status == 0 &&
                    (<li className="liresults" key={id} onClick={() => handleThing(id)}>
                        <div className="product-short">
                            <img className="imgresults" src={image} />
                            <div>
                                <h2>Category: {category}</h2>
                                <p>Description: {description}</p>
                                <p>Location:{name}</p>
                            </div>
                        </div>
                    </li>) 
            })
        }
    </ul>
    </div>
    )
}
export default withRouter(CategoryResults)
import React, { useEffect, useState } from 'react'
import './index.sass'
import logic from '../../logic';

function RetrieveThings(props) {
    const [results, setResults] = useState([])

    const { params: { id, category, description, loc: { name } } } = props

    useEffect(() => {
        async function retrieve() {
            const res = await logic.retrieveThing(id)
            setResults(res)
        }
        retrieve()
    }, [id])



    return (

        <section key={id}>
            <h2>{category}</h2>
            <p>{description}</p>
            <p>{name}</p>
        </section >
    )


}
export default RetrieveThings
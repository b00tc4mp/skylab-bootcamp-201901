import React, { useEffect, useState } from 'react'
import './index.sass'
import logic from '../../logic';

function RetrieveThing(props) {
    const [thing, setThing] = useState({loc:{}})
    // const [state, setstate] = useState(null)

    const { match: { params: { id } } } = props
    
    useEffect(() => {
        async function retrieve() {
            const thing = await logic.retrieveThing(id)
            setThing(thing)            
        }
        retrieve()
    }, [])
    
    const handleGet = (id,stat) => {
        async function state() {
            await logic.updatePublicThing( id, stat)
        }
        state()
    }
    
    const { status, image, category, description, loc:{name} } = thing
    return (

        <section key={id}>
            <img src={image}/>
            <h2>{category}</h2>
            <p>{description}</p>
            <p>{name}</p>
            <button onClick={() => handleGet(id,1)}>GET</button>
            <button onClick={() => handleGet(id,2)}>NOT FOUND</button>
        </section >
    )
}
export default RetrieveThing
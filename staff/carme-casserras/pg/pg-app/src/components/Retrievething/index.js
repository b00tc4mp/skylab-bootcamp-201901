import React, { useEffect, useState } from 'react'
import './index.sass'
import logic from '../../logic';

function RetrieveThing(props) {
    const [thing, setThing] = useState({ loc: {} })

    const { match: { params: { id } } } = props

    useEffect(() => {
        async function retrieve() {
            const thing = await logic.retrieveThing(id)
            setThing(thing)
        }
        retrieve()
    }, [])

    const handleGet = (id, stat) => {
        async function state() {
            await logic.updatePublicThing(id, stat)
        }
        state()
    }

    const { image, category, description, loc: { name } } = thing
    return (
        <div className="contens4" key={id}>
            <div className="contens-center4" >
                <div className="image-big4">
                    <img src={image} alt="" />
                </div>
                <h2><strong>Category: </strong> {category}</h2>
                <p><strong>Description: </strong> {description}</p>
                <p><strong>Location: </strong> {name}</p>
                <div className="buttons">
                    <ul className="navigation">
                        <li>
                            <img src="/../../../images/get.png" onClick={() => handleGet(id, 1)} alt="get" />
                        </li>
                        <li>
                            <img src="/../../../images/notfound.png" onClick={() => handleGet(id, 2)} alt="not found" />
                        </li>
                    </ul>

                    {/* <button onClick={() => handleGet(id, 1)}>GET</button>
                <button onClick={() => handleGet(id, 2)}>NOT FOUND</button> */}
                </div>
            </div>
        </div>
    )
}
export default RetrieveThing
import React, { useEffect, useState } from 'react'
import './index.sass'
import logic from '../../logic';

function RetrieveThing(props) {
    const [thing, setThing] = useState({ loc: {} })
    const [thingGet, setThingGet] = useState(false)

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
            setThingGet(true)
        }
        state()
    }

    const { image, category, description, loc: { name }, loc: { address } } = thing
    return (
        <form>
            <div className="contens4" key={id}>
                <div className="contens-center4" >
                <div className="image-big4">
                    <img src={image} alt="" />
                </div>
                <div className="text">
                    <h2><strong>Category: </strong> {category}</h2>
                    <p><strong>Description: </strong> {description}</p>
                    <p><strong>Location: </strong> {name}</p>
                    <p><strong>Address: </strong> {address}</p>
                </div>
                    <div className="buttons">
                        <ul className="navigation">
                            <li>
                                <img className="get" src="/../../../images/get.png" onClick={() => handleGet(id, 1)} alt="get" />
                            </li>
                            <li>
                                <img className="notfound"src="/../../../images/notfound.png" onClick={() => handleGet(id, 2)} alt="not found" />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div>
                {thingGet && <p className="response">Item retrieve</p>}
            </div>
        </form>
    )
}
export default RetrieveThing
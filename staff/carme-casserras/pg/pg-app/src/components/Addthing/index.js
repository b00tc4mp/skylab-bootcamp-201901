import React, { useState } from 'react'
import './index.sass'
import logic from '../../logic'
import { Link, Redirect } from 'react-router-dom'

const locations = [
    {
        id: "5cfb8925e171ff0fc8f44466",
        name: "Poblenou"
    },

    {
        id: "5cfb86dee171ff0fc8f44464",
        name: "Tetuan",
    },
    {
        id: "5cfb895ee171ff0fc8f44467",
        name: "Glories",
    },
    {
        id: "5cfb87cee171ff0fc8f44465",
        name: "Mallorca",
    },
    {
        id: "5cfb89a6e171ff0fc8f44468",
        name: "Valencia",
    },
    {
        id: "5cfb8e36e171ff0fc8f44469",
        name: "Gotic",
    },
]

function AddThing(props) {


    const [description, setDescription] = useState("");
    const [messageError, setMessageError] = useState(null)
    const [image, setImage] = useState([])
    const [thingUpload, setThingUpload] = useState(false)

    if (!logic.isUserLoggedIn) props.history.push('/login')

    async function handleSubmit(e) {
        e.preventDefault()

        const {
            category: { value: category },
            location: { value: location }
        } = e.target

        try {

            await logic.addPublicThings(image, category, description, location)

            setThingUpload(true)
        } catch (error) {

            setMessageError(error.message)
        }
        setDescription("");
    }

    return (
        <form id="form" className="contens" onSubmit={handleSubmit}>
            <div className="field">
                <label className="label">Category</label>
                <div className="control">
                    <div className="select">
                        <select name="category">
                            <option>Books</option>
                            <option>Clothes</option>
                            <option>Electronics</option>
                            <option>Home</option>
                            <option>Home appliance</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="field">
                <label className="label">Description</label>
                <textarea className="textarea" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>
            <div className="field">
                <label className="label">Location</label>
                <div className="control">
                    <div className="select">
                        <select name="location">
                            {
                                locations.map(loc => {
                                    return <option value={loc.id}>{loc.name}</option>
                                })
                            }
                        </select>
                    </div>
                </div>
            </div>
            <div className="file">
                <div className="file has-name">
                    <label className="file-label">
                        <input className="file-inputd" name="image" type="file" onChange={e => setImage(e.target.files[0])} />
                    </label>
                </div>
            </div>
            <div className="control">
                <button className="button is-success" >Submit</button>
            </div>
            {messageError && <p className="error">{messageError}</p>}
            {thingUpload && <Redirect to="/search/user/things"/>}
        </form>


    )
}

export default AddThing
import React, { useState } from 'react'
import { Route, Redirect } from 'react-router-dom'
import './index.sass'
import logic from '../../logic'

function AddThing({ }) {

    const [messageError, setMessageError] = useState(null)
    const [image, setImage] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isEventInserted, setIsEventInserted] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()

        const {
            category: { value: category },
            description: { value: description },
            location: { value: location }
        } = e.target

        try {
        setIsLoading(true)
        await logic.addPublicThings(image, category, description, location)
        setIsEventInserted(true)
        setIsLoading(false)
        } catch (error) {

            setMessageError(error.message)
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="field">
                <label className="label">Image</label>
                <div className="control">
                    <input className="" name="image" type="file" onChange={e => setImage(e.target.files[0])} />
                </div>
            </div>
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
                <div className="control">
                    <input className="input" type="text" name="description" placeholder="Description" />
                </div>
            </div>

            <div className="field">
                <label className="label">Location</label>
                <div className="control">
                    <div className="select">
                        <select name="location">
                            <option value="5cfb87cee171ff0fc8f44465">Sagrada Familia</option>
                            <option valeu="5cfb86dee171ff0fc8f44464">Plaça Catalunya</option>
                            <option value="5cfb895ee171ff0fc8f44467">Glories</option>
                            <option value="5cfb8925e171ff0fc8f44466">Poblenou</option>
                            <option value="5cfb89a6e171ff0fc8f44468">Enric Granados</option>
                            <option value="5cfb8e36e171ff0fc8f44469">Gotic</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="control">
                <button className="button is-primary">Submit</button>
            </div>
            {messageError && <div className="message-error">
                <p>{messageError}</p>
            </div>}
        </form>
            // {/* {<Redirect to='/search/category' />} */ }
        
    )
    // const renderEventInserted = () => (
    //     <Fragment>
    //         <div className='notification is-warning'>
    //             Event inserted!
    //       </div>
    //         <button className='button' onClick={() => setIsEventInserted(false)}>
    //             Insert another event
    //       </button>
    //     </Fragment>
    // )
}

export default AddThing
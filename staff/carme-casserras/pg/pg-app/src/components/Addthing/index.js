import React, { useState } from 'react'
import { Route, Redirect } from 'react-router-dom'
import './index.sass'
import logic from '../../logic'

function AddThing({ }) {

    const [messageError, setMessageError] = useState(null)

    async function handleSubmit(e) {
        e.preventDefault()

        const {
            category: { value: category },
            description: { value: description },
            localitation: { value: localitation }
        } = e.target

        try {
            
            await logic.addPublicThings(category, description, localitation)
            
        } catch (error) {
            
            setMessageError(error.message)
            
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="field">
                    <label className="label"></label>
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
                    <label className="label"></label>
                    <div className="control">
                        <input className="input" type="text" name="description" placeholder="Description" />
                    </div>
                </div>
                <div className="field">
                    <label className="label"></label>
                    <div className="control">
                        <div className="select">
                            <select name="localitation">
                                <option value="5cf8be92d106202038f0e099">Plaça Urquinaona</option>
                                <option valeu="5cf8bf3ed106202038f0e09a">Plaça Catalunya</option>
                                <option value="5cf8bf71d106202038f0e09b">Glories</option>
                                <option>Sant Andreu</option>
                                <option>Sagrada Familia</option>
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
            {/* {<Redirect to='/search/category' />} */}
        </div>
    )
}

export default AddThing
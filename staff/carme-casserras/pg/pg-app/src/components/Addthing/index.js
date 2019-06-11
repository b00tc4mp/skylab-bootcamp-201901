import React, { useState} from 'react'
import './index.sass'
import logic from '../../logic'

function AddThing(props) {

    const [messageError, setMessageError] = useState(null)
    const [image, setImage] = useState([])
    const [thingUpload, setThingUpoad] = useState(false)

    if (!logic.isUserLoggedIn) props.history.push('/login')

    async function handleSubmit(e) {
        e.preventDefault()

        const {
            category: { value: category },
            description: { value: description },
            location: { value: location }
        } = e.target

        try {

            await logic.addPublicThings(image, category, description, location)
            document.getElementsByName('description')[0].value = ""
            document.getElementsByName('image')[0].value = ""
            document.getElementsByName('error')[0].value = ""
            setThingUpoad(true)
        } catch (error) {
            
            setMessageError(error.message)
        }

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
                <textarea className="textarea" name="description"></textarea>
            </div>
            <div className="field">
                <label className="label">Location</label>
                <div className="control">
                    <div className="select">
                        <select name="location">
                            <option value="5cfb8925e171ff0fc8f44466">Poblenou</option>
                            <option valeu="5cfb86dee171ff0fc8f44464">Urquinaona</option>
                            <option value="5cfb895ee171ff0fc8f44467">Glories</option>
                            <option value="5cfb87cee171ff0fc8f44465">Mallorca</option>
                            <option value="5cfb89a6e171ff0fc8f44468">Valencia</option>
                            <option value="5cfb8e36e171ff0fc8f44469">Gotic</option>
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
            {setThingUpoad && <div className="thingupload">
                <p>Thing upload!</p>
            {messageError && <div className="message-error" name="error">
                <p>{messageError}</p>
            </div>}

            </div>}
        </form>


    )
}

export default AddThing
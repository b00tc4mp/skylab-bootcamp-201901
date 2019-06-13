import React from 'react'
import './index.sass'

function Places({ onAddPOI}) {

    function handleSubmit(e) {
        e.preventDefault()
        const {
            title: { value: title },
            latitude: { value: latitude },
            longitude: { value: longitude },
            color: { value: color }
        } = e.target
        onAddPOI(title,color,Number(latitude),Number(longitude))

    }

    return<main className='main-places'>
    <div className='places-container'>
        <h2 className='title-places title'>Add Point</h2>
        <form className="form-places" onSubmit={handleSubmit}>
            <input className="input-places input field is-rounded is-warning" type="text" name="title" placeholder='Title' autoFocus required/>
            <input className="input-places input field is-rounded is-warning" type="number" name="latitude" placeholder='Latitude Coords' step="any" required/>
            <input className="input-places input field is-rounded is-warning" type="number" name="longitude" placeholder='Longitude Coords' step="any" required />          
            <div class="columns is-mobile">
            <div class="column">
            <div class="control-color control">
                                    <div class="select is-rounded is-warning">
                                        <select name="color">
                                            <option value="red">Select Color</option>
                                            <option value="blue">Blue</option>
                                            <option value="lightblue">Light Blue</option>
                                            <option value="orange">Orange</option>
                                            <option value="purple">Purple</option>
                                            <option value="red">Red</option>
                                            <option value="yellow">Yellow</option>
                                        </select>
                                </div>
                            </div>
            </div>
            <div class="column">
            <input className="button-places button is-rounded is-warning" type="submit" value='CREATE'/>
            </div>
            </div>
        </form>
    </div>
</main>
}

export default Places
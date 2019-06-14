import React from 'react'
import './index.sass'

function Trackings({ onAddTracking, message, error }) {

    function handleSubmitCreate(e) {
        e.preventDefault()
        const {
            serialNumber: { value: serialNumber },
            licensePlate: { value: licensePlate }
        } = e.target

        onAddTracking(serialNumber, licensePlate)
    }

    return <main>
        <section className='main-trackings'>
            <div className='trackings-container'>
                <h2 className='title-trackings title'>Add Tracker</h2>
                <form className="form-trackings" onSubmit={handleSubmitCreate}>
                    <input className="input-trackings input field is-rounded is-warning" type="text" name="serialNumber" placeholder='Tracker Serial Number' autoFocus required />
                    <input className="input-trackings input field is-rounded is-warning" type="text" name="licensePlate" placeholder='License Plate' />
                    <div>
                        <input className="button-trackings button is-rounded is-warning" type="submit" value='CREATE' />
                    </div>
                    <span className="help-trackings help is-primary">{message}</span>
                    <span className="help-trackings help is-danger">{error}</span>
                    </form>
            </div>
        </section>
    </main>
}

export default Trackings

import React, { useState, useEffect } from 'react'
import logic from '../../logic'


export default function DroneDetail({ user, history, droneId }) {
    const [brand, setBrand] = useState(null)
    const [model, setModel] = useState(null)
    const [host, setHost] = useState(null)
    const [port, setPort] = useState(null)
    const [feedback, setFeedback] = useState(null)


    useEffect(() => {
        (async function () {
            if (droneId) {
                try {
                    return logic.retrieveDrone(droneId)
                        .then(drone => {
                            setBrand(drone.brand)
                            setModel(drone.model)
                            setHost(drone.host)
                            setPort(drone.port)
                            setFeedback(null)
                        })
                        .catch(err => setFeedback(err.message))
                } catch ({ message }) {
                    setFeedback(message)
                }
            }
        })();
    }, []);


    function handleSubmit(e) {
        e.preventDefault()

        if (droneId) {
            return logic.updateDrone(droneId, brand, model, host, parseInt(port))
                .then(res => {
                    if (res.status === 'OK') history.push('/admin/drones')
                })
                .catch(err => setFeedback(err))
        } else {
            try {
                return logic.addDrone(brand, model, host, parseInt(port))
                    .then(res => {
                        if (res) history.push('/admin/drones')
                    })
                    .catch(err => console.log(err))
            } catch ({ message }) {
                console.log(message)
            }
        }
    }

    return (<section className="section">
        <div className="columns is-centered">
            <div className="column is-5-tablet is-4-desktop is-3-widescreen">
                <h1 className="title">{droneId ? 'Edit Drone' : 'Add drone'}</h1>
                <form onSubmit={e => handleSubmit(e)}>
                    <div className="field">
                        <label className="label">Brand</label>
                        <div className="control">
                            <input type="text" className="input" placeholder="Brand" value={brand ? brand : ''} onChange={e => setBrand(e.target.value)} />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Model</label>
                        <div className="control">
                            <input type="text" className="input" placeholder="model" value={model ? model : ''} onChange={e => setModel(e.target.value)} />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Host</label>
                        <div className="control">
                            <input type="text" className="input" placeholder="192.168.10.1" value={host ? host : ''} onChange={e => setHost(e.target.value)} />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Port</label>
                        <div className="control">
                            <input type="number" className="input" placeholder="8889" value={port ? port : ''} onChange={e => setPort(e.target.value)} />
                        </div>
                    </div>
                    {feedback && <p>{feedback}</p>}
                    <div className="field is-extanded">
                        <button className="button">{droneId ? 'Edit' : 'Add'}</button>
                    </div>
                </form>
            </div>
        </div>
    </section>)
}
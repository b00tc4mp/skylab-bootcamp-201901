'use strict'

import React, { useContext, useState } from 'react'
import { AppContext } from '../AppContext'
import Feedback from '../Feedback'

export default function ManagaSkylabers({ onSubmit, onToBack }) {

    const { feedback, whiteList } = useContext(AppContext)

    const [name, setName] = useState(null)
    const [surname, setSurname] = useState(null)
    const [email, setEmail] = useState(null)

    const handleFormSubmit = event => {
        event.preventDefault()
        onSubmit({name, surname, email})
    }

    const handleToBack = () => {
        onToBack()
    }

    return (
        <section>
            <div>
                <a onClick={handleToBack}>Go back</a>
                <h2>Add a Skylaber</h2>
                <form onSubmit={handleFormSubmit}>
                    <input autoFocus type="text" name="name" placeholder="Name" onChange={e => setName(e.target.value)} required></input>
                    <input type="text" name="surname" placeholder="Surname" onChange={e => setSurname(e.target.value)} required></input>
                    <input type="text" name="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required></input>
                    {feedback && <Feedback />}
                    <button type="submit">Add Skylaber</button>
                </form>
            </div>
            <div>
                <h2>Pending registrations</h2>
                {whiteList && whiteList.map(res => { return <p>{res.name}</p> })}
            </div>
        </section>
    )
}
'use strict'

import React, { useContext, useState } from 'react'
import { AppContext } from '../AppContext'
import Feedback from '../Feedback'

export default function AddSkylaber({ onSubmit, onToBack }) {

    const { feedback } = useContext(AppContext)

    const [name, setName] = useState(null)
    const [surname, setSurname] = useState(null)
    const [email, setEmail] = useState(null)

    const handleFormSubmit = event => {
        event.preventDefault()
        onSubmit({name, surname, email})
        event.target.value = null
    }

    const handleToBack = () => {
        onToBack()
    }

    return (
        <section>
            <form onSubmit={handleFormSubmit}>
                <input autoFocus type="text" name="name" placeholder="Name" onChange={e => setName(e.target.value)} required></input>
                <input type="text" name="surname" placeholder="Surname" onChange={e => setSurname(e.target.value)} required></input>
                <input type="text" name="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required></input>
                {feedback && <Feedback />}
                <button type="submit">Add Skylaber</button>
                <a onClick={handleToBack}>Go back</a>
            </form>
        </section>
    )
}